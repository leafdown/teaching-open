/*
 *  traqball 2.2
 *  written by Dirk Weber
 *  http://www.eleqtriq.com/
 *  See demo at: http://www.eleqtriq.com/wp-content/static/demos/2011/traqball2011

 *  Copyright (c) 2011 Dirk Weber (http://www.eleqtriq.com)
 *  Licensed under the MIT (http://www.eleqtriq.com/wp-content/uploads/2010/11/mit-license.txt)
 */

(function(){
    var userAgent   = navigator.userAgent.toLowerCase(),
        canTouch    = "ontouchstart" in window,
        prefix      = cssPref = "",
        requestAnimFrame, cancelAnimFrame;

    if(/webkit/gi.test(userAgent)){
        prefix = "-webkit-";
        cssPref = "Webkit";
    }else if(/msie | trident/gi.test(userAgent)){
        prefix = "-ms-";
        cssPref = "ms";
    }else if(/mozilla/gi.test(userAgent)){
        prefix = "-moz-";
        cssPref = "Moz";
    }else if(/opera/gi.test(userAgent)){
        prefix = "-o-";
        cssPref = "O";
    }else{
        prefix = "";
    }

    function bindEvent(target, type, callback, remove){
        //translate events
        var evType      = type || "touchend",
            mouseEvs    = ["mousedown", "mouseup", "mousemove"],
            touchEvs    = ["touchstart", "touchend", "touchmove"],
            remove      = remove || "add";

        // add/remove touch event handlers if device supports them
        if (canTouch) {
          target[remove+"EventListener"](evType, callback, false);
        }

        // always add/remove mouse event handlers
        target[remove+"EventListener"](mouseEvs[touchEvs.indexOf(type)], callback, false);
    }

    function getCoords(eventObj){
        var xTouch,
            yTouch;

        if(eventObj.type.indexOf("mouse") > -1){
            xTouch = eventObj.pageX;
            yTouch = eventObj.pageY;
        }else if(eventObj.type.indexOf("touch") > -1){
            //only do stuff if 1 single finger is used:
            if(eventObj.touches.length === 1){
                var touch   = eventObj.touches[0];
                xTouch      = touch.pageX;
                yTouch      = touch.pageY;
            }
        }

        return [xTouch, yTouch];
    }

    function getStyle(target, prop){
        var style = document.defaultView.getComputedStyle(target, "");
        return style.getPropertyValue(prop);
    }

    requestAnimFrame = (function(){
        return  window[cssPref+"RequestAnimationFrame"] ||
                      function(callback){
                        window.setTimeout(callback, 17);
                      };
        })();

    cancelAnimFrame = (function(){
              return  window[cssPref+"CancelRequestAnimationFrame"] ||
                      clearTimeout;
         })();

    var Traqball = function(confObj){
        this.config = {};
        this.box = null;

        this.setup(confObj);
    };

    Traqball.prototype.disable = function(){
        if(this.box !== null){
            bindEvent(this.box, 'touchstart', this.evHandlers[0], "remove");
            bindEvent(document, 'touchmove', this.evHandlers[1], "remove");
            bindEvent(document, 'touchend', this.evHandlers[2], "remove");
        }
    }

    Traqball.prototype.activate = function(){
        if(this.box !== null){
            bindEvent(this.box, 'touchstart', this.evHandlers[0]);
            bindEvent(document, 'touchmove', this.evHandlers[1], "remove");
            bindEvent(document, 'touchend', this.evHandlers[2], "remove");
        }
    }

    Traqball.prototype.setup = function(conf){
        var THIS            = this,
            radius,                 // prepare a variable for storing the radius of our virtual trackball
            stage,                  // the DOM-container of our "rotatable" element
            axis            = [],   // The rotation-axis
            mouseDownVect   = [],   // Vector on mousedown
            mouseMoveVect   = [],   // Vector during mousemove
            startMatrix     = [],   // Transformation-matrix at the moment of *starting* dragging
            delta           = 0,
            impulse, pos, w, h, decr, angle, oldAngle, oldTime, curTime;

        (function init (){
            THIS.disable();

            for(var prop in conf){
                THIS.config[prop] = conf[prop];
                }

            stage   = document.getElementById(THIS.config.stage) || document.getElementsByTagname("body")[0];
            pos     = findPos(stage);
            angle   = THIS.config.angle || 0;
            impulse = THIS.config.impulse === false ? false : true;

            // Let's calculate some basic values from "stage" that are necessary for our virtual trackball
            // 1st: determine the radius of our virtual trackball:
            h   = stage.offsetHeight/2,
            w   = stage.offsetWidth/2;

            //take the shortest of both values as radius
            radius = h<w ? h : w;

            //We parse viewport. The first block-element we find will be our "victim" and made rotatable
            for(var i=0, l=stage.childNodes.length; i<l; i++){
                var child = stage.childNodes[i];

                if(child.nodeType === 1){
                    THIS.box = child;
                    break;
                }
            }

            var perspective = getStyle(stage, prefix+"perspective"),
                pOrigin     = getStyle(stage, prefix+"perspective-origin"),
                bTransform  = getStyle(THIS.box, prefix+"transform");

            //Let's define the start values. If "conf" contains angle or perspective or vector, use them.
            //If not, look for css3d transforms within the CSS.
            //If this fails, let's use some default values.

            if(THIS.config.axis || THIS.config.angle){
                // Normalize the initAxis (initAxis = axis of rotation) because "box" will look distorted if normal is too long
                axis = normalize(THIS.config.axis) || [1,0,0];
                angle = THIS.config.angle || 0;
                // Last but not least we calculate a matrix from the axis and the angle.
                // This matrix will store the initial orientation in 3d-space
                startMatrix = calcMatrix(axis, angle);
            }else if(bTransform !== "none"){
                //already css3d transforms on element?
                startMatrix = bTransform.split(",");

                //Under certain circumstances some browsers report 2d Transforms.
                //Translate them to 3d:
                if(/matrix3d/gi.test(startMatrix[0])){
                    startMatrix[0] = startMatrix[0].replace(/(matrix3d\()/g, "");
                    startMatrix[15] = startMatrix[15].replace(/\)/g, "");
                }else{
                    startMatrix[0] = startMatrix[0].replace(/(matrix\()/g, "");
                    startMatrix[5] = startMatrix[5].replace(/\)/g, "");
                    startMatrix.splice(2,0,0,0);
                    startMatrix.splice(6,0,0,0);
                    startMatrix.splice(8,0,0,0,1,0);
                    startMatrix.splice(14,0,0,1);
                }
                for(var i = 0, l = startMatrix.length; i<l; i++){
                    startMatrix[i] = parseFloat(startMatrix[i]);
                }
            }else{
                axis        = [0,1,0];
                angle       = 0;
                startMatrix = calcMatrix(axis, angle);
            }

            if(THIS.config.perspective){
                stage.style[cssPref+"Perspective"] = THIS.config.perspective;
            }else if(perspective === "none"){
                stage.style[cssPref+"Perspective"] = "700px";
            }

            if(THIS.config.perspectiveOrigin){
                stage.style[cssPref+"PerspectiveOrigin"] = THIS.config.perspectiveOrigin;
            }

            THIS.box.style[cssPref+"Transform"] = "matrix3d("+ startMatrix+")";
            bindEvent(THIS.box, 'touchstart', startrotation);

            THIS.evHandlers = [startrotation, rotate, finishrotation];

            // expose stopSlide
            THIS.stop = hardStop;
        })();


        function startrotation(e){
            if(delta !== 0){stopSlide();};
            e.preventDefault();

            mouseDownVect   = calcZvector(getCoords(e));
            oldTime         = curTime = new Date().getTime();
            oldAngle        = angle;

            bindEvent(THIS.box,'touchstart', startrotation, "remove");
            bindEvent(document, 'touchmove', rotate);
            bindEvent(document, 'touchend', finishrotation);
        }

        function finishrotation(e){
            var stopMatrix;

            bindEvent(document, 'touchmove', rotate, "remove");
            bindEvent(document, 'touchend', finishrotation, "remove");
            bindEvent(THIS.box, 'touchstart', startrotation);
            calcSpeed();
            if( impulse && delta > 0){
                requestAnimFrame(slide);
            }else if(!(isNaN(axis[0]) || isNaN(axis[1]) || isNaN(axis[2]))) {
                stopSlide();
            }
        }

        function cleanupMatrix(){
            // Clean up when finishing rotation. Only thing to do: create a new "initial" matrix for the next rotation.
            // If we don't, the object will flip back to the position at launch every time the user starts dragging.
            // Therefore we must:
            // 1. calculate a matrix from axis and the current angle
            // 2. Create a new startmatrix by combining current startmatrix and stopmatrix to a new matrix.
            // Matrices can be combined by multiplication, so what are we waiting for?

            if (mouseMoveVect.length) {
              stopMatrix  = calcMatrix(axis, angle);
              startMatrix = multiplyMatrix(startMatrix,stopMatrix);

              eulerAngles(startMatrix);

              mouseMoveVect = [];
            }
        }

        // The rotation:
        function rotate(e){
            var eCoords = getCoords(e);
            e.preventDefault();

            oldTime = curTime;
            oldAngle = angle;

            // Calculate the currrent z-component of the 3d-vector on the virtual trackball
            mouseMoveVect = calcZvector(eCoords);

            // We already calculated the z-vector-component on mousedown and the z-vector-component during mouse-movement.
            // We will use them to retrieve the current rotation-axis
            // (the normal-vector perpendiular to mouseDownVect and mouseMoveVect).
            axis[0] = mouseDownVect[1]*mouseMoveVect[2]-mouseDownVect[2]*mouseMoveVect[1];
            axis[1] = mouseDownVect[2]*mouseMoveVect[0]-mouseDownVect[0]*mouseMoveVect[2];
            axis[2] = mouseDownVect[0]*mouseMoveVect[1]-mouseDownVect[1]*mouseMoveVect[0];
            axis    = normalize(axis);

            // Now that we have the normal, we need the angle of the rotation.
            // Easy to find by calculating the angle between mouseDownVect and mouseMoveVect:
            angle = calcAngle(mouseDownVect, mouseMoveVect);

            //Only one thing left to do: Update the position of the box by applying a new transform:
            // 2 transforms will be applied: the current rotation 3d and the start-matrix
            THIS.box.style[cssPref+"Transform"] = "rotate3d("+ axis+","+angle+"rad) matrix3d("+startMatrix+")";

            // temporary stopMatrix
            var _stopMatrix = calcMatrix(axis, angle);
            eulerAngles( multiplyMatrix(startMatrix, _stopMatrix) );

            curTime = new Date().getTime();
        }

        function eulerAngles(R) {
          // Get camera vector
          var M = new Matrix4();
          M.fromArray(R);
          M = M.getInverse(M);

          // Get rotation vector (to match initial transform?)
          var rot = new Matrix4();
          rot.makeRotationZ(Math.PI/2);
          M.premultiply(rot);

          // This gives us the desired values
          var euler = new Euler();
          euler.setFromRotationMatrix(M, 'XYZ');
          euler.roll  = radToDeg(euler.x);
          euler.pitch = radToDeg(euler.y);
          euler.yaw   = radToDeg(euler.z) - 90 ;

          THIS.config['rotationCallback'](euler);
        }

        function radToDeg(r) {
          return r * 180 / Math.PI;
        }

        function calcSpeed(){
            var dw  = angle - oldAngle;
                dt  = curTime-oldTime;

            delta   = Math.abs(dw*17/dt);

            if(isNaN(delta)){
                delta = 0;
            }else if(delta > 0.2){
                delta = 0.2;
            }
        }

        function slide(){
            angle+= delta;
            decr = 0.01*Math.sqrt(delta);
            delta = delta > 0 ? delta-decr : 0;

            THIS.box.style[cssPref+"Transform"] = "rotate3d("+ axis+","+angle+"rad) matrix3d("+startMatrix+")";

            // temporary stopMatrix
            var _stopMatrix = calcMatrix(axis, angle);
            eulerAngles( multiplyMatrix(startMatrix, _stopMatrix) );

            if (delta === 0){
                stopSlide();
            }else{
                requestAnimFrame(slide);
            }
        }

        function hardStop(done) {
            stopSlide();
            if (done) {
              setTimeout(done, 100);
            }
        }

        function stopSlide(){
            cancelAnimFrame(slide);
            cleanupMatrix();
            oldAngle = angle = 0;
            delta = 0;
        }

        //Some stupid matrix-multiplication.
        function multiplyMatrix(m1, m2){
            var matrix = [];

            matrix[0]   = m1[0]*m2[0]+m1[1]*m2[4]+m1[2]*m2[8]+m1[3]*m2[12];
            matrix[1]   = m1[0]*m2[1]+m1[1]*m2[5]+m1[2]*m2[9]+m1[3]*m2[13];
            matrix[2]   = m1[0]*m2[2]+m1[1]*m2[6]+m1[2]*m2[10]+m1[3]*m2[14];
            matrix[3]   = m1[0]*m2[3]+m1[1]*m2[7]+m1[2]*m2[11]+m1[3]*m2[15];
            matrix[4]   = m1[4]*m2[0]+m1[5]*m2[4]+m1[6]*m2[8]+m1[7]*m2[12];
            matrix[5]   = m1[4]*m2[1]+m1[5]*m2[5]+m1[6]*m2[9]+m1[7]*m2[13];
            matrix[6]   = m1[4]*m2[2]+m1[5]*m2[6]+m1[6]*m2[10]+m1[7]*m2[14];
            matrix[7]   = m1[4]*m2[3]+m1[5]*m2[7]+m1[6]*m2[11]+m1[7]*m2[15];
            matrix[8]   = m1[8]*m2[0]+m1[9]*m2[4]+m1[10]*m2[8]+m1[11]*m2[12];
            matrix[9]   = m1[8]*m2[1]+m1[9]*m2[5]+m1[10]*m2[9]+m1[11]*m2[13];
            matrix[10]  = m1[8]*m2[2]+m1[9]*m2[6]+m1[10]*m2[10]+m1[11]*m2[14];
            matrix[11]  = m1[8]*m2[3]+m1[9]*m2[7]+m1[10]*m2[11]+m1[11]*m2[15];
            matrix[12]  = m1[12]*m2[0]+m1[13]*m2[4]+m1[14]*m2[8]+m1[15]*m2[12];
            matrix[13]  = m1[12]*m2[1]+m1[13]*m2[5]+m1[14]*m2[9]+m1[15]*m2[13];
            matrix[14]  = m1[12]*m2[2]+m1[13]*m2[6]+m1[14]*m2[10]+m1[15]*m2[14];
            matrix[15]  = m1[12]*m2[3]+m1[13]*m2[7]+m1[14]*m2[11]+m1[15]*m2[15];

            return matrix;
        }

        // This function will calculate a z-component for our 3D-vector from the mouse x and y-coordinates
        // (the corresponding point on our virtual trackball):
        function calcZvector(coords){
            var x       = THIS.config.limitAxxis === "x" ? radius : coords[0] - pos[0],
                y       = THIS.config.limitAxxis === "y" ? radius : coords[1] - pos[1],
                vector  = [(x/radius-1), (y/radius-1)],
                z       = 1 - vector[0]*vector[0] - vector[1]*vector[1];

             // Make sure that dragging stops when z gets a negative value:
            vector[2]   = z > 0 ? Math.sqrt(z) : 0;

            return vector;
        }

        // Normalization recalculates all coordinates in a way that the resulting vector has a length of "1".
        // We achieve this by dividing the x, y and z-coordinates by the vector's length
        function normalize(vect){
            var length = Math.sqrt( vect[0]*vect[0] + vect[1]*vect[1] + vect[2]*vect[2] );

            vect[0]/= length;
            vect[1]/= length;
            vect[2]/= length;

            return vect;
        }

        // Calculate the angle between 2 vectors.
        function calcAngle(vect_1, vect_2){
            var numerator   =   vect_1[0]*vect_2[0] + vect_1[1]*vect_2[1] + vect_1[2]*vect_2[2],
                denominator =   Math.sqrt(vect_1[0]*vect_1[0] + vect_1[1]*vect_1[1] + vect_1[2]*vect_1[2])*
                                Math.sqrt(vect_2[0]*vect_2[0] + vect_2[1]*vect_2[1] + vect_2[2]*vect_2[2]),
                angle       =   Math.acos(numerator/denominator);

            return angle;
        }

        function calcMatrix(vector, angle){
            // calculate transformation-matrix from a vector[x,y,z] and an angle
            var x       = vector[0],
                y       = vector[1],
                z       = vector[2],
                sin     = Math.sin(angle),
                cos     = Math.cos(angle),
                cosmin  = 1-cos,
                matrix  = [(cos+x*x*cosmin), (y*x*cosmin+z*sin),(z*x*cosmin-y*sin),0,
                          (x*y*cosmin-z*sin), (cos+y*y*cosmin), (z*y*cosmin+x*sin),0,
                          (x*z*cosmin+y*sin), (y*z*cosmin-x*sin), (cos+z*z*cosmin),0,
                          0,0,0,1];

            return matrix;
        }

        //findPos-script by www.quirksmode.org
        function findPos(obj) {
            var curleft = 0,
                curtop  = 0;

            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);

                return [curleft,curtop];
            }
        }
    }

    window.Traqball = Traqball;
})();

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Matrix4() {

	this.elements = new Float32Array( [

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1

	] );

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

	}

}

Matrix4.prototype = {

	constructor: Matrix4,

	isMatrix4: true,

	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	premultiply: function ( m ) {

		return this.multiplyMatrices( m, this );

	},

	multiplyMatrices: function ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	},

	getInverse: function ( m, throwOnDegenerate ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements,
			me = m.elements,

			n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
			n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
			n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
			n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) {

			var msg = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnDegenerate === true ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			return this.identity();

		}

		var detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;

	},

	makeRotationZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1

		);

		return this;

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		for( var i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

};

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

function Euler( x, y, z, order ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._order = order || Euler.DefaultOrder;

}

Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

Euler.DefaultOrder = 'XYZ';

Euler.prototype = {

	constructor: Euler,

	isEuler: true,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;

	},

	get order () {

		return this._order;

	},

	set order ( value ) {

		this._order = value;

	},

	set: function ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		return this;

	},

	setFromRotationMatrix: function ( m, order, update ) {

    var clamp = function ( value, min, max ) {
      return Math.max( min, Math.min( max, value ) );
    }

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {

				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {

				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {

				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {

				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {

				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}

		} else {

			console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order );

		}

		this._order = order;

		return this;

	}

};
