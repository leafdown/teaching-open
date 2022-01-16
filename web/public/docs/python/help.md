[builtins](https://www.lanqu.vip/docs/python#builtins)

abs

\_\_builtin\_\_ 模块内置功能 **abs** 的帮助 :

abs(...)
    abs(number) -> number
    
   返回参数的绝对值。

all

\_\_builtin\_\_ 模块内置函数 **all** 的帮助:

all(...)
    all(iterable) -> bool
    
    如果 bool（x） 对于可迭代对象中的所有值 x 都为 True，则返回 True。
    如果可迭代对象为空，则返回 True。

any

Help on built-in function any in module \_\_builtin\_\_:

any(...)
    any(iterable) -> bool
    
    Return True if bool(x) is True for any x in the iterable.
    If the iterable is empty, return False.

bin

Help on built-in function bin in module \_\_builtin\_\_:

bin(...)
    bin(number) -> string
    
    Return the binary representation of an integer or long integer.

chr

Help on built-in function chr in module \_\_builtin\_\_:

chr(...)
    chr(i) -> character
    
    Return a string of one character with ordinal i; 0 <= i < 256.

dir

Help on built-in function dir in module \_\_builtin\_\_:

dir(...)
    dir(\[object\]) -> list of strings
    
    If called without an argument, return the names in the current scope.
    Else, return an alphabetized list of names comprising (some of) the attributes
    of the given object, and of attributes reachable from it.
    If the object supplies a method named \_\_dir\_\_, it will be used; otherwise
    the default dir() logic is used and returns:
      for a module object: the module's attributes.
      for a class object:  its attributes, and recursively the attributes
        of its bases.
      for any other object: its attributes, its class's attributes, and
        recursively the attributes of its class's base classes.

filter

Help on built-in function filter in module \_\_builtin\_\_:

filter(...)
    filter(function or None, sequence) -> list, tuple, or string
    
    Return those items of sequence for which function(item) is true.  If
    function is None, return the items that are true.  If sequence is a tuple
    or string, return the same type, else return a list.

getattr

Help on built-in function getattr in module \_\_builtin\_\_:

getattr(...)
    getattr(object, name\[, default\]) -> value
    
    Get a named attribute from an object; getattr(x, 'y') is equivalent to x.y.
    When a default argument is given, it is returned when the attribute doesn't
    exist; without it, an exception is raised in that case.

globals

Help on built-in function globals in module \_\_builtin\_\_:

globals(...)
    globals() -> dictionary
    
    Return the dictionary containing the current scope's global variables.

hasattr

Help on built-in function hasattr in module \_\_builtin\_\_:

hasattr(...)
    hasattr(object, name) -> bool
    
    Return whether the object has an attribute with the given name.
    (This is done by calling getattr(object, name) and catching exceptions.)

hash

Help on built-in function hash in module \_\_builtin\_\_:

hash(...)
    hash(object) -> integer
    
    Return a hash value for the object.  Two objects with the same value have
    the same hash value.  The reverse is not necessarily true, but likely.

hex

Help on built-in function hex in module \_\_builtin\_\_:

hex(...)
    hex(number) -> string
    
    Return the hexadecimal representation of an integer or long integer.

input

Help on built-in function input in module \_\_builtin\_\_:

input(...)
    input(\[prompt\]) -> value
    
    Equivalent to eval(raw\_input(prompt)).

isinstance

Help on built-in function isinstance in module \_\_builtin\_\_:

isinstance(...)
    isinstance(object, class-or-type-or-tuple) -> bool
    
    Return whether an object is an instance of a class or of a subclass thereof.
    With a type as second argument, return whether that is the object's type.
    The form using a tuple, isinstance(x, (A, B, ...)), is a shortcut for
    isinstance(x, A) or isinstance(x, B) or ... (etc.).

issubclass

Help on built-in function issubclass in module \_\_builtin\_\_:

issubclass(...)
    issubclass(C, B) -> bool
    
    Return whether class C is a subclass (i.e., a derived class) of class B.
    When using a tuple as the second argument issubclass(X, (A, B, ...)),
    is a shortcut for issubclass(X, A) or issubclass(X, B) or ... (etc.).

len

Help on built-in function len in module \_\_builtin\_\_:

len(...)
    len(object) -> integer
    
    Return the number of items of a sequence or mapping.

map

Help on built-in function map in module \_\_builtin\_\_:

map(...)
    map(function, sequence\[, sequence, ...\]) -> list
    
    Return a list of the results of applying the function to the items of
    the argument sequence(s).  If more than one sequence is given, the
    function is called with an argument list consisting of the corresponding
    item of each sequence, substituting None for missing values when not all
    sequences have the same length.  If the function is None, return a list of
    the items of the sequence (or a list of tuples if more than one sequence).

max

Help on built-in function max in module \_\_builtin\_\_:

max(...)
    max(iterable\[, key=func\]) -> value
    max(a, b, c, ...\[, key=func\]) -> value
    
    With a single iterable argument, return its largest item.
    With two or more arguments, return the largest argument.

min

Help on built-in function min in module \_\_builtin\_\_:

min(...)
    min(iterable\[, key=func\]) -> value
    min(a, b, c, ...\[, key=func\]) -> value
    
    With a single iterable argument, return its smallest item.
    With two or more arguments, return the smallest argument.

oct

Help on built-in function oct in module \_\_builtin\_\_:

oct(...)
    oct(number) -> string
    
    Return the octal representation of an integer or long integer.

open

Help on built-in function open in module \_\_builtin\_\_:

open(...)
    open(name\[, mode\[, buffering\]\]) -> file object
    
    Open a file using the file() type, returns a file object.  This is the
    preferred way to open a file.  See file.\_\_doc\_\_ for further information.

ord

Help on built-in function ord in module \_\_builtin\_\_:

ord(...)
    ord(c) -> integer
    
    Return the integer ordinal of a one-character string.

pow

Help on built-in function pow in module \_\_builtin\_\_:

pow(...)
    pow(x, y\[, z\]) -> number
    
    With two arguments, equivalent to x\*\*y.  With three arguments,
    equivalent to (x\*\*y) % z, but may be more efficient (e.g. for longs).

quit

Help on Quitter in module site object:

quit = class Quitter(\_\_builtin\_\_.object)
 |  Methods defined here:
 |  
 |  \_\_call\_\_(self, code=None)
 |  
 |  \_\_init\_\_(self, name)
 |  
 |  \_\_repr\_\_(self)
 |  
 |  ----------------------------------------------------------------------
 |  Data descriptors defined here:
 |  
 |  \_\_dict\_\_
 |      dictionary for instance variables (if defined)
 |  
 |  \_\_weakref\_\_
 |      list of weak references to the object (if defined)

range

Help on built-in function range in module \_\_builtin\_\_:

range(...)
    range(stop) -> list of integers
    range(start, stop\[, step\]) -> list of integers
    
    Return a list containing an arithmetic progression of integers.
    range(i, j) returns \[i, i+1, i+2, ..., j-1\]; start (!) defaults to 0.
    When step is given, it specifies the increment (or decrement).
    For example, range(4) returns \[0, 1, 2, 3\].  The end point is omitted!
    These are exactly the valid indices for a list of 4 elements.

raw\_input

Help on built-in function raw\_input in module \_\_builtin\_\_:

raw\_input(...)
    raw\_input(\[prompt\]) -> string
    
    Read a string from standard input.  The trailing newline is stripped.
    If the user hits EOF (Unix: Ctl-D, Windows: Ctl-Z+Return), raise EOFError.
    On Unix, GNU readline is used if enabled.  The prompt string, if given,
    is printed without a trailing newline before reading.

reduce

Help on built-in function reduce in module \_\_builtin\_\_:

reduce(...)
    reduce(function, sequence\[, initial\]) -> value
    
    Apply a function of two arguments cumulatively to the items of a sequence,
    from left to right, so as to reduce the sequence to a single value.
    For example, reduce(lambda x, y: x+y, \[1, 2, 3, 4, 5\]) calculates
    ((((1+2)+3)+4)+5).  If initial is present, it is placed before the items
    of the sequence in the calculation, and serves as a default when the
    sequence is empty.

repr

Help on module repr:

NAME
    repr - Redo the builtin repr() (representation) but with limits on most sizes.

FILE
    /usr/lib/python2.7/repr.py

MODULE DOCS
    http://docs.python.org/library/repr

CLASSES
    Repr
    
    class Repr
     |  Methods defined here:
     |  
     |  \_\_init\_\_(self)
     |  
     |  repr(self, x)
     |  
     |  repr1(self, x, level)
     |  
     |  repr\_array(self, x, level)
     |  
     |  repr\_deque(self, x, level)
     |  
     |  repr\_dict(self, x, level)
     |  
     |  repr\_frozenset(self, x, level)
     |  
     |  repr\_instance(self, x, level)
     |  
     |  repr\_list(self, x, level)
     |  
     |  repr\_long(self, x, level)
     |  
     |  repr\_set(self, x, level)
     |  
     |  repr\_str(self, x, level)
     |  
     |  repr\_tuple(self, x, level)

FUNCTIONS
    repr(self, x) method of Repr instance

DATA
    \_\_all\_\_ = \['Repr', 'repr'\]

round

Help on built-in function round in module \_\_builtin\_\_:

round(...)
    round(number\[, ndigits\]) -> floating point number
    
    Round a number to a given precision in decimal digits (default 0 digits).
    This always returns a floating point number.  Precision may be negative.

sorted

Help on built-in function sorted in module \_\_builtin\_\_:

sorted(...)
    sorted(iterable, cmp=None, key=None, reverse=False) --> new sorted list

sum

Help on built-in function sum in module \_\_builtin\_\_:

sum(...)
    sum(sequence\[, start\]) -> value
    
    Return the sum of a sequence of numbers (NOT strings) plus the value
    of parameter 'start' (which defaults to 0).  When the sequence is
    empty, return start.

xrange

Help on class xrange in module \_\_builtin\_\_:

class xrange(object)
 |  xrange(stop) -> xrange object
 |  xrange(start, stop\[, step\]) -> xrange object
 |  
 |  Like range(), but instead of returning a list, returns an object that
 |  generates the numbers in the range on demand.  For looping, this is 
 |  slightly faster than range() and more memory efficient.
 |  
 |  Methods defined here:
 |  
 |  \_\_getattribute\_\_(...)
 |      x.\_\_getattribute\_\_('name') <==> x.name
 |  
 |  \_\_getitem\_\_(...)
 |      x.\_\_getitem\_\_(y) <==> x\[y\]
 |  
 |  \_\_iter\_\_(...)
 |      x.\_\_iter\_\_() <==> iter(x)
 |  
 |  \_\_len\_\_(...)
 |      x.\_\_len\_\_() <==> len(x)
 |  
 |  \_\_reduce\_\_(...)
 |  
 |  \_\_repr\_\_(...)
 |      x.\_\_repr\_\_() <==> repr(x)
 |  
 |  \_\_reversed\_\_(...)
 |      Returns a reverse iterator.
 |  
 |  ----------------------------------------------------------------------
 |  Data and other attributes defined here:
 |  
 |  \_\_new\_\_ = <built-in method \_\_new\_\_ of type object>
 |      T.\_\_new\_\_(S, ...) -> a new object with type S, a subtype of T

zip

Help on built-in function zip in module \_\_builtin\_\_:

zip(...)
    zip(seq1 \[, seq2 \[...\]\]) -> \[(seq1\[0\], seq2\[0\] ...), (...)\]
    
    Return a list of tuples, where each tuple contains the i-th element
    from each of the argument sequences.  The returned list is truncated
    in length to the length of the shortest argument sequence.

[math](https://trinket.io/docs/python#math)

math.acos

Help on built-in function acos in math:

math.acos = acos(...)
    acos(x)
    
    Return the arc cosine (measured in radians) of x.

math.acosh

Help on built-in function acosh in math:

math.acosh = acosh(...)
    acosh(x)
    
    Return the hyperbolic arc cosine (measured in radians) of x.

math.asin

Help on built-in function asin in math:

math.asin = asin(...)
    asin(x)
    
    Return the arc sine (measured in radians) of x.

math.asinh

Help on built-in function asinh in math:

math.asinh = asinh(...)
    asinh(x)
    
    Return the hyperbolic arc sine (measured in radians) of x.

math.atan

Help on built-in function atan in math:

math.atan = atan(...)
    atan(x)
    
    Return the arc tangent (measured in radians) of x.

math.atan2

Help on built-in function atan2 in math:

math.atan2 = atan2(...)
    atan2(y, x)
    
    Return the arc tangent (measured in radians) of y/x.
    Unlike atan(y/x), the signs of both x and y are considered.

math.atanh

Help on built-in function atanh in math:

math.atanh = atanh(...)
    atanh(x)
    
    Return the hyperbolic arc tangent (measured in radians) of x.

math.ceil

Help on built-in function ceil in math:

math.ceil = ceil(...)
    ceil(x)
    
    Return the ceiling of x as a float.
    This is the smallest integral value >= x.

math.cos

Help on built-in function cos in math:

math.cos = cos(...)
    cos(x)
    
    Return the cosine of x (measured in radians).

math.cosh

Help on built-in function cosh in math:

math.cosh = cosh(...)
    cosh(x)
    
    Return the hyperbolic cosine of x.

math.degrees

Help on built-in function degrees in math:

math.degrees = degrees(...)
    degrees(x)
    
    Convert angle x from radians to degrees.

math.exp

Help on built-in function exp in math:

math.exp = exp(...)
    exp(x)
    
    Return e raised to the power of x.

math.fabs

Help on built-in function fabs in math:

math.fabs = fabs(...)
    fabs(x)
    
    Return the absolute value of the float x.

math.factorial

Help on built-in function factorial in math:

math.factorial = factorial(...)
    factorial(x) -> Integral
    
    Find x!. Raise a ValueError if x is negative or non-integral.

math.floor

Help on built-in function floor in math:

math.floor = floor(...)
    floor(x)
    
    Return the floor of x as a float.
    This is the largest integral value <= x.

math.hypot

Help on built-in function hypot in math:

math.hypot = hypot(...)
    hypot(x, y)
    
    Return the Euclidean distance, sqrt(x\*x + y\*y).

math.log

Help on built-in function log in math:

math.log = log(...)
    log(x\[, base\])
    
    Return the logarithm of x to the given base.
    If the base not specified, returns the natural logarithm (base e) of x.

math.log10

Help on built-in function log10 in math:

math.log10 = log10(...)
    log10(x)
    
    Return the base 10 logarithm of x.

math.pow

Help on built-in function pow in math:

math.pow = pow(...)
    pow(x, y)
    
    Return x\*\*y (x to the power of y).

math.radians

Help on built-in function radians in math:

math.radians = radians(...)
    radians(x)
    
    Convert angle x from degrees to radians.

math.sin

Help on built-in function sin in math:

math.sin = sin(...)
    sin(x)
    
    Return the sine of x (measured in radians).

math.sinh

Help on built-in function sinh in math:

math.sinh = sinh(...)
    sinh(x)
    
    Return the hyperbolic sine of x.

math.sqrt

Help on built-in function sqrt in math:

math.sqrt = sqrt(...)
    sqrt(x)
    
    Return the square root of x.

math.tan

Help on built-in function tan in math:

math.tan = tan(...)
    tan(x)
    
    Return the tangent of x (measured in radians).

math.tanh

Help on built-in function tanh in math:

math.tanh = tanh(...)
    tanh(x)
    
    Return the hyperbolic tangent of x.

math.trunc

Help on built-in function trunc in math:

math.trunc = trunc(...)
    trunc(x:Real) -> Integral
    
    Truncates x to the nearest Integral toward 0. Uses the \_\_trunc\_\_ magic method.

[matplotlib.pyplot](https://trinket.io/docs/python#matplotlib_pyplot)

matplotlib.pyplot.axis

Help on function axis in matplotlib.pyplot:

matplotlib.pyplot.axis = axis(\*v, \*\*kwargs)
    Convenience method to get or set axis properties.
    
    Calling with no arguments::
    
      >>> axis()
    
    returns the current axes limits \`\`\[xmin, xmax, ymin, ymax\]\`\`.::
    
      >>> axis(v)
    
    sets the min and max of the x and y axes, with
    \`\`v = \[xmin, xmax, ymin, ymax\]\`\`.::
    
      >>> axis('off')
    
    turns off the axis lines and labels.::
    
      >>> axis('equal')
    
    changes limits of \*x\* or \*y\* axis so that equal increments of \*x\*
    and \*y\* have the same length; a circle is circular.::
    
      >>> axis('scaled')
    
    achieves the same result by changing the dimensions of the plot box instead
    of the axis data limits.::
    
      >>> axis('tight')
    
    changes \*x\* and \*y\* axis limits such that all data is shown. If
    all data is already shown, it will move it to the center of the
    figure without modifying (\*xmax\* - \*xmin\*) or (\*ymax\* -
    \*ymin\*). Note this is slightly different than in MATLAB.::
    
      >>> axis('image')
    
    is 'scaled' with the axis limits equal to the data limits.::
    
      >>> axis('auto')
    
    and::
    
      >>> axis('normal')
    
    are deprecated. They restore default behavior; axis limits are automatically
    scaled to make the data fit comfortably within the plot box.
    
    if \`\`len(\*v)==0\`\`, you can pass in \*xmin\*, \*xmax\*, \*ymin\*, \*ymax\*
    as kwargs selectively to alter just those limits without changing
    the others.
    
    The xmin, xmax, ymin, ymax tuple is returned
    
    .. seealso::
    
        :func:\`xlim\`, :func:\`ylim\`
           For setting the x- and y-limits individually.

matplotlib.pyplot.clf

Help on function clf in matplotlib.pyplot:

matplotlib.pyplot.clf = clf()
    Clear the current figure.

matplotlib.pyplot.plot

Help on function plot in matplotlib.pyplot:

matplotlib.pyplot.plot = plot(\*args, \*\*kwargs)
    Plot lines and/or markers to the
    :class:\`~matplotlib.axes.Axes\`.  \*args\* is a variable length
    argument, allowing for multiple \*x\*, \*y\* pairs with an
    optional format string.  For example, each of the following is
    legal::
    
        plot(x, y)        # plot x and y using default line style and color
        plot(x, y, 'bo')  # plot x and y using blue circle markers
        plot(y)           # plot y using x as index array 0..N-1
        plot(y, 'r+')     # ditto, but with red plusses
    
    If \*x\* and/or \*y\* is 2-dimensional, then the corresponding columns
    will be plotted.
    
    An arbitrary number of \*x\*, \*y\*, \*fmt\* groups can be
    specified, as in::
    
        a.plot(x1, y1, 'g^', x2, y2, 'g-')
    
    Return value is a list of lines that were added.
    
    By default, each line is assigned a different color specified by a
    'color cycle'.  To change this behavior, you can edit the
    axes.color\_cycle rcParam. Alternatively, you can use
    :meth:\`~matplotlib.axes.Axes.set\_default\_color\_cycle\`.
    
    The following format string characters are accepted to control
    the line style or marker:
    
    ================    ===============================
    character           description
    ================    ===============================
    \`\`'-'\`\`             solid line style
    \`\`'--'\`\`            dashed line style
    \`\`'-.'\`\`            dash-dot line style
    \`\`':'\`\`             dotted line style
    \`\`'.'\`\`             point marker
    \`\`','\`\`             pixel marker
    \`\`'o'\`\`             circle marker
    \`\`'v'\`\`             triangle\_down marker
    \`\`'^'\`\`             triangle\_up marker
    \`\`'<'\`\`             triangle\_left marker
    \`\`'>'\`\`             triangle\_right marker
    \`\`'1'\`\`             tri\_down marker
    \`\`'2'\`\`             tri\_up marker
    \`\`'3'\`\`             tri\_left marker
    \`\`'4'\`\`             tri\_right marker
    \`\`'s'\`\`             square marker
    \`\`'p'\`\`             pentagon marker
    \`\`'\*'\`\`             star marker
    \`\`'h'\`\`             hexagon1 marker
    \`\`'H'\`\`             hexagon2 marker
    \`\`'+'\`\`             plus marker
    \`\`'x'\`\`             x marker
    \`\`'D'\`\`             diamond marker
    \`\`'d'\`\`             thin\_diamond marker
    \`\`'|'\`\`             vline marker
    \`\`'\_'\`\`             hline marker
    ================    ===============================
    
    
    The following color abbreviations are supported:
    
    ==========  ========
    character   color
    ==========  ========
    'b'         blue
    'g'         green
    'r'         red
    'c'         cyan
    'm'         magenta
    'y'         yellow
    'k'         black
    'w'         white
    ==========  ========
    
    In addition, you can specify colors in many weird and
    wonderful ways, including full names (\`\`'green'\`\`), hex
    strings (\`\`'#008000'\`\`), RGB or RGBA tuples (\`\`(0,1,0,1)\`\`) or
    grayscale intensities as a string (\`\`'0.8'\`\`).  Of these, the
    string specifications can be used in place of a \`\`fmt\`\` group,
    but the tuple forms can be used only as \`\`kwargs\`\`.
    
    Line styles and colors are combined in a single format string, as in
    \`\`'bo'\`\` for blue circles.
    
    The \*kwargs\* can be used to set line properties (any property that has
    a \`\`set\_\*\`\` method).  You can use this to set a line label (for auto
    legends), linewidth, anitialising, marker face color, etc.  Here is an
    example::
    
        plot(\[1,2,3\], \[1,2,3\], 'go-', label='line 1', linewidth=2)
        plot(\[1,2,3\], \[1,4,9\], 'rs',  label='line 2')
        axis(\[0, 4, 0, 10\])
        legend()
    
    If you make multiple lines with one plot command, the kwargs
    apply to all those lines, e.g.::
    
        plot(x1, y1, x2, y2, antialised=False)
    
    Neither line will be antialiased.
    
    You do not need to use format strings, which are just
    abbreviations.  All of the line properties can be controlled
    by keyword arguments.  For example, you can set the color,
    marker, linestyle, and markercolor with::
    
        plot(x, y, color='green', linestyle='dashed', marker='o',
             markerfacecolor='blue', markersize=12).
    
    See :class:\`~matplotlib.lines.Line2D\` for details.
    
    The kwargs are :class:\`~matplotlib.lines.Line2D\` properties:
    
      agg\_filter: unknown
      alpha: float (0.0 transparent through 1.0 opaque)         
      animated: \[True | False\]         
      antialiased or aa: \[True | False\]         
      axes: an :class:\`~matplotlib.axes.Axes\` instance         
      clip\_box: a :class:\`matplotlib.transforms.Bbox\` instance         
      clip\_on: \[True | False\]         
      clip\_path: \[ (:class:\`~matplotlib.path.Path\`,         :class:\`~matplotlib.transforms.Transform\`) |         :class:\`~matplotlib.patches.Patch\` | None \]         
      color or c: any matplotlib color         
      contains: a callable function         
      dash\_capstyle: \['butt' | 'round' | 'projecting'\]         
      dash\_joinstyle: \['miter' | 'round' | 'bevel'\]         
      dashes: sequence of on/off ink in points         
      drawstyle: \['default' | 'steps' | 'steps-pre' | 'steps-mid' |                   'steps-post'\]         
      figure: a :class:\`matplotlib.figure.Figure\` instance         
      fillstyle: \['full' | 'left' | 'right' | 'bottom' | 'top' | 'none'\]         
      gid: an id string         
      label: string or anything printable with '%s' conversion.         
      linestyle or ls: \[\`\`'-'\`\` | \`\`'--'\`\` | \`\`'-.'\`\` | \`\`':'\`\` | \`\`'None'\`\` |                   \`\`' '\`\` | \`\`''\`\`\]         and any drawstyle in combination with a linestyle, e.g., \`\`'steps--'\`\`.         
      linewidth or lw: float value in points         
      lod: \[True | False\]         
      marker: unknown
      markeredgecolor or mec: any matplotlib color         
      markeredgewidth or mew: float value in points         
      markerfacecolor or mfc: any matplotlib color         
      markerfacecoloralt or mfcalt: any matplotlib color         
      markersize or ms: float         
      markevery: None | integer | (startind, stride)
      path\_effects: unknown
      picker: float distance in points or callable pick function         \`\`fn(artist, event)\`\`         
      pickradius: float distance in points         
      rasterized: \[True | False | None\]         
      sketch\_params: unknown
      snap: unknown
      solid\_capstyle: \['butt' | 'round' |  'projecting'\]         
      solid\_joinstyle: \['miter' | 'round' | 'bevel'\]         
      transform: a :class:\`matplotlib.transforms.Transform\` instance         
      url: a url string         
      visible: \[True | False\]         
      xdata: 1D array         
      ydata: 1D array         
      zorder: any number         
    
    kwargs \*scalex\* and \*scaley\*, if defined, are passed on to
    :meth:\`~matplotlib.axes.Axes.autoscale\_view\` to determine
    whether the \*x\* and \*y\* axes are autoscaled; the default is
    \*True\*.
    
    Additional kwargs: hold = \[True|False\] overrides default hold state

matplotlib.pyplot.show

Help on function show in matplotlib.pyplot:

matplotlib.pyplot.show = show(\*args, \*\*kw)
    Display a figure.
    
    When running in ipython with its pylab mode, display all
    figures and return to the ipython prompt.
    
    In non-interactive mode, display all figures and block until
    the figures have been closed; in interactive mode it has no
    effect unless figures were created prior to a change from
    non-interactive to interactive mode (not recommended).  In
    that case it displays the figures but does not block.
    
    A single experimental keyword argument, \*block\*, may be
    set to True or False to override the blocking behavior
    described above.

matplotlib.pyplot.title

Help on function title in matplotlib.pyplot:

matplotlib.pyplot.title = title(s, \*args, \*\*kwargs)
    Set a title of the current axes.
    
    Set one of the three available axes titles. The available titles are
    positioned above the axes in the center, flush with the left edge,
    and flush with the right edge.
    
    Parameters
    ----------
    label : str
        Text to use for the title
    fontdict : dict
        A dictionary controlling the appearance of the title text,
        the default \`fontdict\` is:
        {'fontsize': rcParams\['axes.titlesize'\],
         'verticalalignment': 'baseline',
         'horizontalalignment': loc}
    loc : {'center', 'left', 'right'}, str, optional
        Which title to set, defaults to 'center'
    
    Returns
    -------
    text : :class:\`~matplotlib.text.Text\`
        The matplotlib text instance representing the title
    
    Other parameters
    ----------------
    Other keyword arguments are text properties, see
    :class:\`~matplotlib.text.Text\` for a list of valid text
    properties.
    
    See also
    --------
    See :func:\`~matplotlib.pyplot.text\` for adding text to the current axes

matplotlib.pyplot.xlabel

Help on function xlabel in matplotlib.pyplot:

matplotlib.pyplot.xlabel = xlabel(s, \*args, \*\*kwargs)
    Set the \*x\* axis label of the current axis.
    
    Default override is::
    
      override = {
          'fontsize'            : 'small',
          'verticalalignment'   : 'top',
          'horizontalalignment' : 'center'
          }
    
    .. seealso::
    
        :func:\`~matplotlib.pyplot.text\`
            For information on how override and the optional args work

matplotlib.pyplot.ylabel

Help on function ylabel in matplotlib.pyplot:

matplotlib.pyplot.ylabel = ylabel(s, \*args, \*\*kwargs)
    Set the \*y\* axis label of the current axis.
    
    Defaults override is::
    
        override = {
           'fontsize'            : 'small',
           'verticalalignment'   : 'center',
           'horizontalalignment' : 'right',
           'rotation'='vertical' : }
    
    .. seealso::
    
        :func:\`~matplotlib.pyplot.text\`
            For information on how override and the optional args
            work.

[numpy](https://trinket.io/docs/python#numpy)

numpy.arccos

arccos(x\[, out\])

Trigonometric inverse cosine, element-wise.

The inverse of \`cos\` so that, if \`\`y = cos(x)\`\`, then \`\`x = arccos(y)\`\`.

Parameters
----------
x : array\_like
    \`x\`-coordinate on the unit circle.
    For real arguments, the domain is \[-1, 1\].

out : ndarray, optional
    Array of the same shape as \`a\`, to store results in. See
    \`doc.ufuncs\` (Section "Output arguments") for more details.

Returns
-------
angle : ndarray
    The angle of the ray intersecting the unit circle at the given
    \`x\`-coordinate in radians \[0, pi\]. If \`x\` is a scalar then a
    scalar is returned, otherwise an array of the same shape as \`x\`
    is returned.

See Also
--------
cos, arctan, arcsin, emath.arccos

Notes
-----
\`arccos\` is a multivalued function: for each \`x\` there are infinitely
many numbers \`z\` such that \`cos(z) = x\`. The convention is to return
the angle \`z\` whose real part lies in \`\[0, pi\]\`.

For real-valued input data types, \`arccos\` always returns real output.
For each value that cannot be expressed as a real number or infinity,
it yields \`\`nan\`\` and sets the \`invalid\` floating point error flag.

For complex-valued input, \`arccos\` is a complex analytic function that
has branch cuts \`\[-inf, -1\]\` and \`\[1, inf\]\` and is continuous from
above on the former and from below on the latter.

The inverse \`cos\` is also known as \`acos\` or cos^-1.

References
----------
M. Abramowitz and I.A. Stegun, "Handbook of Mathematical Functions",
10th printing, 1964, pp. 79. http://www.math.sfu.ca/~cbm/aands/

Examples
--------
We expect the arccos of 1 to be 0, and of -1 to be pi:

>>> np.arccos(\[1, -1\])
array(\[ 0.        ,  3.14159265\])

Plot arccos:

>>> import matplotlib.pyplot as plt
>>> x = np.linspace(-1, 1, num=100)
>>> plt.plot(x, np.arccos(x))
>>> plt.axis('tight')
>>> plt.show()

numpy.arcsin

arcsin(x\[, out\])

Inverse sine, element-wise.

Parameters
----------
x : array\_like
    \`y\`-coordinate on the unit circle.

out : ndarray, optional
    Array of the same shape as \`x\`, in which to store the results.
    See \`doc.ufuncs\` (Section "Output arguments") for more details.

Returns
-------
angle : ndarray
    The inverse sine of each element in \`x\`, in radians and in the
    closed interval \`\`\[-pi/2, pi/2\]\`\`.  If \`x\` is a scalar, a scalar
    is returned, otherwise an array.

See Also
--------
sin, cos, arccos, tan, arctan, arctan2, emath.arcsin

Notes
-----
\`arcsin\` is a multivalued function: for each \`x\` there are infinitely
many numbers \`z\` such that :math:\`sin(z) = x\`.  The convention is to
return the angle \`z\` whose real part lies in \[-pi/2, pi/2\].

For real-valued input data types, \*arcsin\* always returns real output.
For each value that cannot be expressed as a real number or infinity,
it yields \`\`nan\`\` and sets the \`invalid\` floating point error flag.

For complex-valued input, \`arcsin\` is a complex analytic function that
has, by convention, the branch cuts \[-inf, -1\] and \[1, inf\]  and is
continuous from above on the former and from below on the latter.

The inverse sine is also known as \`asin\` or sin^{-1}.

References
----------
Abramowitz, M. and Stegun, I. A., \*Handbook of Mathematical Functions\*,
10th printing, New York: Dover, 1964, pp. 79ff.
http://www.math.sfu.ca/~cbm/aands/

Examples
--------
>>> np.arcsin(1)     # pi/2
1.5707963267948966
>>> np.arcsin(-1)    # -pi/2
-1.5707963267948966
>>> np.arcsin(0)
0.0

numpy.arctan

arctan(x\[, out\])

Trigonometric inverse tangent, element-wise.

The inverse of tan, so that if \`\`y = tan(x)\`\` then \`\`x = arctan(y)\`\`.

Parameters
----------
x : array\_like
    Input values.  \`arctan\` is applied to each element of \`x\`.

Returns
-------
out : ndarray
    Out has the same shape as \`x\`.  Its real part is in
    \`\`\[-pi/2, pi/2\]\`\` (\`\`arctan(+/-inf)\`\` returns \`\`+/-pi/2\`\`).
    It is a scalar if \`x\` is a scalar.

See Also
--------
arctan2 : The "four quadrant" arctan of the angle formed by (\`x\`, \`y\`)
    and the positive \`x\`-axis.
angle : Argument of complex values.

Notes
-----
\`arctan\` is a multi-valued function: for each \`x\` there are infinitely
many numbers \`z\` such that tan(\`z\`) = \`x\`.  The convention is to return
the angle \`z\` whose real part lies in \[-pi/2, pi/2\].

For real-valued input data types, \`arctan\` always returns real output.
For each value that cannot be expressed as a real number or infinity,
it yields \`\`nan\`\` and sets the \`invalid\` floating point error flag.

For complex-valued input, \`arctan\` is a complex analytic function that
has \[\`1j, infj\`\] and \[\`-1j, -infj\`\] as branch cuts, and is continuous
from the left on the former and from the right on the latter.

The inverse tangent is also known as \`atan\` or tan^{-1}.

References
----------
Abramowitz, M. and Stegun, I. A., \*Handbook of Mathematical Functions\*,
10th printing, New York: Dover, 1964, pp. 79.
http://www.math.sfu.ca/~cbm/aands/

Examples
--------
We expect the arctan of 0 to be 0, and of 1 to be pi/4:

>>> np.arctan(\[0, 1\])
array(\[ 0.        ,  0.78539816\])

>>> np.pi/4
0.78539816339744828

Plot arctan:

>>> import matplotlib.pyplot as plt
>>> x = np.linspace(-10, 10)
>>> plt.plot(x, np.arctan(x))
>>> plt.axis('tight')
>>> plt.show()

numpy.arctan2

arctan2(x1, x2\[, out\])

Element-wise arc tangent of \`\`x1/x2\`\` choosing the quadrant correctly.

The quadrant (i.e., branch) is chosen so that \`\`arctan2(x1, x2)\`\` is
the signed angle in radians between the ray ending at the origin and
passing through the point (1,0), and the ray ending at the origin and
passing through the point (\`x2\`, \`x1\`).  (Note the role reversal: the
"\`y\`-coordinate" is the first function parameter, the "\`x\`-coordinate"
is the second.)  By IEEE convention, this function is defined for
\`x2\` = +/-0 and for either or both of \`x1\` and \`x2\` = +/-inf (see
Notes for specific values).

This function is not defined for complex-valued arguments; for the
so-called argument of complex values, use \`angle\`.

Parameters
----------
x1 : array\_like, real-valued
    \`y\`-coordinates.
x2 : array\_like, real-valued
    \`x\`-coordinates. \`x2\` must be broadcastable to match the shape of
    \`x1\` or vice versa.

Returns
-------
angle : ndarray
    Array of angles in radians, in the range \`\`\[-pi, pi\]\`\`.

See Also
--------
arctan, tan, angle

Notes
-----
\*arctan2\* is identical to the \`atan2\` function of the underlying
C library.  The following special values are defined in the C
standard: \[1\]\_

====== ====== ================
\`x1\`   \`x2\`   \`arctan2(x1,x2)\`
====== ====== ================
+/- 0  +0     +/- 0
+/- 0  -0     +/- pi
 > 0   +/-inf +0 / +pi
 < 0   +/-inf -0 / -pi
+/-inf +inf   +/- (pi/4)
+/-inf -inf   +/- (3\*pi/4)
====== ====== ================

Note that +0 and -0 are distinct floating point numbers, as are +inf
and -inf.

References
----------
.. \[1\] ISO/IEC standard 9899:1999, "Programming language C."

Examples
--------
Consider four points in different quadrants:

>>> x = np.array(\[-1, +1, +1, -1\])
>>> y = np.array(\[-1, -1, +1, +1\])
>>> np.arctan2(y, x) \* 180 / np.pi
array(\[-135.,  -45.,   45.,  135.\])

Note the order of the parameters. \`arctan2\` is defined also when \`x2\` = 0
and at several other special points, obtaining values in
the range \`\`\[-pi, pi\]\`\`:

>>> np.arctan2(\[1., -1.\], \[0., 0.\])
array(\[ 1.57079633, -1.57079633\])
>>> np.arctan2(\[0., 0., np.inf\], \[+0., -0., np.inf\])
array(\[ 0.        ,  3.14159265,  0.78539816\])

numpy.array

Help on built-in function array in numpy:

numpy.array = array(...)
    array(object, dtype=None, copy=True, order=None, subok=False, ndmin=0)
    
    Create an array.
    
    Parameters
    ----------
    object : array\_like
        An array, any object exposing the array interface, an
        object whose \_\_array\_\_ method returns an array, or any
        (nested) sequence.
    dtype : data-type, optional
        The desired data-type for the array.  If not given, then
        the type will be determined as the minimum type required
        to hold the objects in the sequence.  This argument can only
        be used to 'upcast' the array.  For downcasting, use the
        .astype(t) method.
    copy : bool, optional
        If true (default), then the object is copied.  Otherwise, a copy
        will only be made if \_\_array\_\_ returns a copy, if obj is a
        nested sequence, or if a copy is needed to satisfy any of the other
        requirements (\`dtype\`, \`order\`, etc.).
    order : {'C', 'F', 'A'}, optional
        Specify the order of the array.  If order is 'C' (default), then the
        array will be in C-contiguous order (last-index varies the
        fastest).  If order is 'F', then the returned array
        will be in Fortran-contiguous order (first-index varies the
        fastest).  If order is 'A', then the returned array may
        be in any order (either C-, Fortran-contiguous, or even
        discontiguous).
    subok : bool, optional
        If True, then sub-classes will be passed-through, otherwise
        the returned array will be forced to be a base-class array (default).
    ndmin : int, optional
        Specifies the minimum number of dimensions that the resulting
        array should have.  Ones will be pre-pended to the shape as
        needed to meet this requirement.
    
    Returns
    -------
    out : ndarray
        An array object satisfying the specified requirements.
    
    See Also
    --------
    empty, empty\_like, zeros, zeros\_like, ones, ones\_like, fill
    
    Examples
    --------
    >>> np.array(\[1, 2, 3\])
    array(\[1, 2, 3\])
    
    Upcasting:
    
    >>> np.array(\[1, 2, 3.0\])
    array(\[ 1.,  2.,  3.\])
    
    More than one dimension:
    
    >>> np.array(\[\[1, 2\], \[3, 4\]\])
    array(\[\[1, 2\],
           \[3, 4\]\])
    
    Minimum dimensions 2:
    
    >>> np.array(\[1, 2, 3\], ndmin=2)
    array(\[\[1, 2, 3\]\])
    
    Type provided:
    
    >>> np.array(\[1, 2, 3\], dtype=complex)
    array(\[ 1.+0.j,  2.+0.j,  3.+0.j\])
    
    Data-type consisting of more than one element:
    
    >>> x = np.array(\[(1,2),(3,4)\],dtype=\[('a','<i4'),('b','<i4')\])
    >>> x\['a'\]
    array(\[1, 3\])
    
    Creating an array from sub-classes:
    
    >>> np.array(np.mat('1 2; 3 4'))
    array(\[\[1, 2\],
           \[3, 4\]\])
    
    >>> np.array(np.mat('1 2; 3 4'), subok=True)
    matrix(\[\[1, 2\],
            \[3, 4\]\])

numpy.asarray

Help on function asarray in numpy:

numpy.asarray = asarray(a, dtype=None, order=None)
    Convert the input to an array.
    
    Parameters
    ----------
    a : array\_like
        Input data, in any form that can be converted to an array.  This
        includes lists, lists of tuples, tuples, tuples of tuples, tuples
        of lists and ndarrays.
    dtype : data-type, optional
        By default, the data-type is inferred from the input data.
    order : {'C', 'F'}, optional
        Whether to use row-major ('C') or column-major ('F' for FORTRAN)
        memory representation.  Defaults to 'C'.
    
    Returns
    -------
    out : ndarray
        Array interpretation of \`a\`.  No copy is performed if the input
        is already an ndarray.  If \`a\` is a subclass of ndarray, a base
        class ndarray is returned.
    
    See Also
    --------
    asanyarray : Similar function which passes through subclasses.
    ascontiguousarray : Convert input to a contiguous array.
    asfarray : Convert input to a floating point ndarray.
    asfortranarray : Convert input to an ndarray with column-major
                     memory order.
    asarray\_chkfinite : Similar function which checks input for NaNs and Infs.
    fromiter : Create an array from an iterator.
    fromfunction : Construct an array by executing a function on grid
                   positions.
    
    Examples
    --------
    Convert a list into an array:
    
    >>> a = \[1, 2\]
    >>> np.asarray(a)
    array(\[1, 2\])
    
    Existing arrays are not copied:
    
    >>> a = np.array(\[1, 2\])
    >>> np.asarray(a) is a
    True
    
    If \`dtype\` is set, array is copied only if dtype does not match:
    
    >>> a = np.array(\[1, 2\], dtype=np.float32)
    >>> np.asarray(a, dtype=np.float32) is a
    True
    >>> np.asarray(a, dtype=np.float64) is a
    False
    
    Contrary to \`asanyarray\`, ndarray subclasses are not passed through:
    
    >>> issubclass(np.matrix, np.ndarray)
    True
    >>> a = np.matrix(\[\[1, 2\]\])
    >>> np.asarray(a) is a
    False
    >>> np.asanyarray(a) is a
    True

numpy.copy

Help on function copy in numpy:

numpy.copy = copy(a, order='K')
    Return an array copy of the given object.
    
    Parameters
    ----------
    a : array\_like
        Input data.
    order : {'C', 'F', 'A', 'K'}, optional
        Controls the memory layout of the copy. 'C' means C-order,
        'F' means F-order, 'A' means 'F' if \`a\` is Fortran contiguous,
        'C' otherwise. 'K' means match the layout of \`a\` as closely
        as possible. (Note that this function and :meth:ndarray.copy are very
        similar, but have different default values for their order=
        arguments.)
    
    Returns
    -------
    arr : ndarray
        Array interpretation of \`a\`.
    
    Notes
    -----
    This is equivalent to
    
    >>> np.array(a, copy=True)                              #doctest: +SKIP
    
    Examples
    --------
    Create an array x, with a reference y and a copy z:
    
    >>> x = np.array(\[1, 2, 3\])
    >>> y = x
    >>> z = np.copy(x)
    
    Note that, when we modify x, y changes, but not z:
    
    >>> x\[0\] = 10
    >>> x\[0\] == y\[0\]
    True
    >>> x\[0\] == z\[0\]
    False

numpy.cos

cos(x\[, out\])

Cosine element-wise.

Parameters
----------
x : array\_like
    Input array in radians.
out : ndarray, optional
    Output array of same shape as \`x\`.

Returns
-------
y : ndarray
    The corresponding cosine values.

Raises
------
ValueError: invalid return array shape
    if \`out\` is provided and \`out.shape\` != \`x.shape\` (See Examples)

Notes
-----
If \`out\` is provided, the function writes the result into it,
and returns a reference to \`out\`.  (See Examples)

References
----------
M. Abramowitz and I. A. Stegun, Handbook of Mathematical Functions.
New York, NY: Dover, 1972.

Examples
--------
>>> np.cos(np.array(\[0, np.pi/2, np.pi\]))
array(\[  1.00000000e+00,   6.12303177e-17,  -1.00000000e+00\])
>>>
>>> # Example of providing the optional output parameter
>>> out2 = np.cos(\[0.1\], out1)
>>> out2 is out1
True
>>>
>>> # Example of ValueError due to provision of shape mis-matched \`out\`
>>> np.cos(np.zeros((3,3)),np.zeros((2,2)))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid return array shape

numpy.cosh

cosh(x\[, out\])

Hyperbolic cosine, element-wise.

Equivalent to \`\`1/2 \* (np.exp(x) + np.exp(-x))\`\` and \`\`np.cos(1j\*x)\`\`.

Parameters
----------
x : array\_like
    Input array.

Returns
-------
out : ndarray
    Output array of same shape as \`x\`.

Examples
--------
>>> np.cosh(0)
1.0

The hyperbolic cosine describes the shape of a hanging cable:

>>> import matplotlib.pyplot as plt
>>> x = np.linspace(-4, 4, 1000)
>>> plt.plot(x, np.cosh(x))
>>> plt.show()

numpy.dot

Help on built-in function dot in numpy:

numpy.dot = dot(...)
    dot(a, b, out=None)
    
    Dot product of two arrays.
    
    For 2-D arrays it is equivalent to matrix multiplication, and for 1-D
    arrays to inner product of vectors (without complex conjugation). For
    N dimensions it is a sum product over the last axis of \`a\` and
    the second-to-last of \`b\`::
    
        dot(a, b)\[i,j,k,m\] = sum(a\[i,j,:\] \* b\[k,:,m\])
    
    Parameters
    ----------
    a : array\_like
        First argument.
    b : array\_like
        Second argument.
    out : ndarray, optional
        Output argument. This must have the exact kind that would be returned
        if it was not used. In particular, it must have the right type, must be
        C-contiguous, and its dtype must be the dtype that would be returned
        for \`dot(a,b)\`. This is a performance feature. Therefore, if these
        conditions are not met, an exception is raised, instead of attempting
        to be flexible.
    
    Returns
    -------
    output : ndarray
        Returns the dot product of \`a\` and \`b\`.  If \`a\` and \`b\` are both
        scalars or both 1-D arrays then a scalar is returned; otherwise
        an array is returned.
        If \`out\` is given, then it is returned.
    
    Raises
    ------
    ValueError
        If the last dimension of \`a\` is not the same size as
        the second-to-last dimension of \`b\`.
    
    See Also
    --------
    vdot : Complex-conjugating dot product.
    tensordot : Sum products over arbitrary axes.
    einsum : Einstein summation convention.
    
    Examples
    --------
    >>> np.dot(3, 4)
    12
    
    Neither argument is complex-conjugated:
    
    >>> np.dot(\[2j, 3j\], \[2j, 3j\])
    (-13+0j)
    
    For 2-D arrays it's the matrix product:
    
    >>> a = \[\[1, 0\], \[0, 1\]\]
    >>> b = \[\[4, 1\], \[2, 2\]\]
    >>> np.dot(a, b)
    array(\[\[4, 1\],
           \[2, 2\]\])
    
    >>> a = np.arange(3\*4\*5\*6).reshape((3,4,5,6))
    >>> b = np.arange(3\*4\*5\*6)\[::-1\].reshape((5,4,6,3))
    >>> np.dot(a, b)\[2,3,2,1,2,2\]
    499128
    >>> sum(a\[2,3,2,:\] \* b\[1,2,:,2\])
    499128

numpy.empty

Help on built-in function empty in numpy:

numpy.empty = empty(...)
    empty(shape, dtype=float, order='C')
    
    Return a new array of given shape and type, without initializing entries.
    
    Parameters
    ----------
    shape : int or tuple of int
        Shape of the empty array
    dtype : data-type, optional
        Desired output data-type.
    order : {'C', 'F'}, optional
        Whether to store multi-dimensional data in C (row-major) or
        Fortran (column-major) order in memory.
    
    See Also
    --------
    empty\_like, zeros, ones
    
    Notes
    -----
    \`empty\`, unlike \`zeros\`, does not set the array values to zero,
    and may therefore be marginally faster.  On the other hand, it requires
    the user to manually set all the values in the array, and should be
    used with caution.
    
    Examples
    --------
    >>> np.empty(\[2, 2\])
    array(\[\[ -9.74499359e+001,   6.69583040e-309\],
           \[  2.13182611e-314,   3.06959433e-309\]\])         #random
    
    >>> np.empty(\[2, 2\], dtype=int)
    array(\[\[-1073741821, -1067949133\],
           \[  496041986,    19249760\]\])                     #random

numpy.empty\_like

Help on built-in function empty\_like in numpy:

numpy.empty\_like = empty\_like(...)
    empty\_like(a, dtype=None, order='K', subok=True)
    
    Return a new array with the same shape and type as a given array.
    
    Parameters
    ----------
    a : array\_like
        The shape and data-type of \`a\` define these same attributes of the
        returned array.
    dtype : data-type, optional
        .. versionadded:: 1.6.0
        Overrides the data type of the result.
    order : {'C', 'F', 'A', or 'K'}, optional
        .. versionadded:: 1.6.0
        Overrides the memory layout of the result. 'C' means C-order,
        'F' means F-order, 'A' means 'F' if \`\`a\`\` is Fortran contiguous,
        'C' otherwise. 'K' means match the layout of \`\`a\`\` as closely
        as possible.
    subok : bool, optional.
        If True, then the newly created array will use the sub-class
        type of 'a', otherwise it will be a base-class array. Defaults
        to True.
    
    Returns
    -------
    out : ndarray
        Array of uninitialized (arbitrary) data with the same
        shape and type as \`a\`.
    
    See Also
    --------
    ones\_like : Return an array of ones with shape and type of input.
    zeros\_like : Return an array of zeros with shape and type of input.
    empty : Return a new uninitialized array.
    ones : Return a new array setting values to one.
    zeros : Return a new array setting values to zero.
    
    Notes
    -----
    This function does \*not\* initialize the returned array; to do that use
    \`zeros\_like\` or \`ones\_like\` instead.  It may be marginally faster than
    the functions that do set the array values.
    
    Examples
    --------
    >>> a = (\[1,2,3\], \[4,5,6\])                         # a is array-like
    >>> np.empty\_like(a)
    array(\[\[-1073741821, -1073741821,           3\],    #random
           \[          0,           0, -1073741821\]\])
    >>> a = np.array(\[\[1., 2., 3.\],\[4.,5.,6.\]\])
    >>> np.empty\_like(a)
    array(\[\[ -2.00000715e+000,   1.48219694e-323,  -2.00000572e+000\],#random
           \[  4.38791518e-305,  -2.00000715e+000,   4.17269252e-309\]\])

numpy.fill

no Python documentation found for 'numpy.fill'

numpy.full

Help on function full in numpy:

numpy.full = full(shape, fill\_value, dtype=None, order='C')
    Return a new array of given shape and type, filled with \`fill\_value\`.
    
    Parameters
    ----------
    shape : int or sequence of ints
        Shape of the new array, e.g., \`\`(2, 3)\`\` or \`\`2\`\`.
    fill\_value : scalar
        Fill value.
    dtype : data-type, optional
        The desired data-type for the array, e.g., \`numpy.int8\`.  Default is
        is chosen as \`np.array(fill\_value).dtype\`.
    order : {'C', 'F'}, optional
        Whether to store multidimensional data in C- or Fortran-contiguous
        (row- or column-wise) order in memory.
    
    Returns
    -------
    out : ndarray
        Array of \`fill\_value\` with the given shape, dtype, and order.
    
    See Also
    --------
    zeros\_like : Return an array of zeros with shape and type of input.
    ones\_like : Return an array of ones with shape and type of input.
    empty\_like : Return an empty array with shape and type of input.
    full\_like : Fill an array with shape and type of input.
    zeros : Return a new array setting values to zero.
    ones : Return a new array setting values to one.
    empty : Return a new uninitialized array.
    
    Examples
    --------
    >>> np.full((2, 2), np.inf)
    array(\[\[ inf,  inf\],
           \[ inf,  inf\]\])
    >>> np.full((2, 2), 10, dtype=np.int)
    array(\[\[10, 10\],
           \[10, 10\]\])

numpy.ones

Help on function ones in numpy:

numpy.ones = ones(shape, dtype=None, order='C')
    Return a new array of given shape and type, filled with ones.
    
    Parameters
    ----------
    shape : int or sequence of ints
        Shape of the new array, e.g., \`\`(2, 3)\`\` or \`\`2\`\`.
    dtype : data-type, optional
        The desired data-type for the array, e.g., \`numpy.int8\`.  Default is
        \`numpy.float64\`.
    order : {'C', 'F'}, optional
        Whether to store multidimensional data in C- or Fortran-contiguous
        (row- or column-wise) order in memory.
    
    Returns
    -------
    out : ndarray
        Array of ones with the given shape, dtype, and order.
    
    See Also
    --------
    zeros, ones\_like
    
    Examples
    --------
    >>> np.ones(5)
    array(\[ 1.,  1.,  1.,  1.,  1.\])
    
    >>> np.ones((5,), dtype=np.int)
    array(\[1, 1, 1, 1, 1\])
    
    >>> np.ones((2, 1))
    array(\[\[ 1.\],
           \[ 1.\]\])
    
    >>> s = (2,2)
    >>> np.ones(s)
    array(\[\[ 1.,  1.\],
           \[ 1.,  1.\]\])

numpy.ones\_like

Help on function ones\_like in numpy:

numpy.ones\_like = ones\_like(a, dtype=None, order='K', subok=True)
    Return an array of ones with the same shape and type as a given array.
    
    Parameters
    ----------
    a : array\_like
        The shape and data-type of \`a\` define these same attributes of
        the returned array.
    dtype : data-type, optional
        .. versionadded:: 1.6.0
        Overrides the data type of the result.
    order : {'C', 'F', 'A', or 'K'}, optional
        .. versionadded:: 1.6.0
        Overrides the memory layout of the result. 'C' means C-order,
        'F' means F-order, 'A' means 'F' if \`a\` is Fortran contiguous,
        'C' otherwise. 'K' means match the layout of \`a\` as closely
        as possible.
    subok : bool, optional.
        If True, then the newly created array will use the sub-class
        type of 'a', otherwise it will be a base-class array. Defaults
        to True.
    
    Returns
    -------
    out : ndarray
        Array of ones with the same shape and type as \`a\`.
    
    See Also
    --------
    zeros\_like : Return an array of zeros with shape and type of input.
    empty\_like : Return an empty array with shape and type of input.
    zeros : Return a new array setting values to zero.
    ones : Return a new array setting values to one.
    empty : Return a new uninitialized array.
    
    Examples
    --------
    >>> x = np.arange(6)
    >>> x = x.reshape((2, 3))
    >>> x
    array(\[\[0, 1, 2\],
           \[3, 4, 5\]\])
    >>> np.ones\_like(x)
    array(\[\[1, 1, 1\],
           \[1, 1, 1\]\])
    
    >>> y = np.arange(3, dtype=np.float)
    >>> y
    array(\[ 0.,  1.,  2.\])
    >>> np.ones\_like(y)
    array(\[ 1.,  1.,  1.\])

numpy.ones\_like

Help on function ones\_like in numpy:

numpy.ones\_like = ones\_like(a, dtype=None, order='K', subok=True)
    Return an array of ones with the same shape and type as a given array.
    
    Parameters
    ----------
    a : array\_like
        The shape and data-type of \`a\` define these same attributes of
        the returned array.
    dtype : data-type, optional
        .. versionadded:: 1.6.0
        Overrides the data type of the result.
    order : {'C', 'F', 'A', or 'K'}, optional
        .. versionadded:: 1.6.0
        Overrides the memory layout of the result. 'C' means C-order,
        'F' means F-order, 'A' means 'F' if \`a\` is Fortran contiguous,
        'C' otherwise. 'K' means match the layout of \`a\` as closely
        as possible.
    subok : bool, optional.
        If True, then the newly created array will use the sub-class
        type of 'a', otherwise it will be a base-class array. Defaults
        to True.
    
    Returns
    -------
    out : ndarray
        Array of ones with the same shape and type as \`a\`.
    
    See Also
    --------
    zeros\_like : Return an array of zeros with shape and type of input.
    empty\_like : Return an empty array with shape and type of input.
    zeros : Return a new array setting values to zero.
    ones : Return a new array setting values to one.
    empty : Return a new uninitialized array.
    
    Examples
    --------
    >>> x = np.arange(6)
    >>> x = x.reshape((2, 3))
    >>> x
    array(\[\[0, 1, 2\],
           \[3, 4, 5\]\])
    >>> np.ones\_like(x)
    array(\[\[1, 1, 1\],
           \[1, 1, 1\]\])
    
    >>> y = np.arange(3, dtype=np.float)
    >>> y
    array(\[ 0.,  1.,  2.\])
    >>> np.ones\_like(y)
    array(\[ 1.,  1.,  1.\])

numpy.ones\_like

Help on function ones\_like in numpy:

numpy.ones\_like = ones\_like(a, dtype=None, order='K', subok=True)
    Return an array of ones with the same shape and type as a given array.
    
    Parameters
    ----------
    a : array\_like
        The shape and data-type of \`a\` define these same attributes of
        the returned array.
    dtype : data-type, optional
        .. versionadded:: 1.6.0
        Overrides the data type of the result.
    order : {'C', 'F', 'A', or 'K'}, optional
        .. versionadded:: 1.6.0
        Overrides the memory layout of the result. 'C' means C-order,
        'F' means F-order, 'A' means 'F' if \`a\` is Fortran contiguous,
        'C' otherwise. 'K' means match the layout of \`a\` as closely
        as possible.
    subok : bool, optional.
        If True, then the newly created array will use the sub-class
        type of 'a', otherwise it will be a base-class array. Defaults
        to True.
    
    Returns
    -------
    out : ndarray
        Array of ones with the same shape and type as \`a\`.
    
    See Also
    --------
    zeros\_like : Return an array of zeros with shape and type of input.
    empty\_like : Return an empty array with shape and type of input.
    zeros : Return a new array setting values to zero.
    ones : Return a new array setting values to one.
    empty : Return a new uninitialized array.
    
    Examples
    --------
    >>> x = np.arange(6)
    >>> x = x.reshape((2, 3))
    >>> x
    array(\[\[0, 1, 2\],
           \[3, 4, 5\]\])
    >>> np.ones\_like(x)
    array(\[\[1, 1, 1\],
           \[1, 1, 1\]\])
    
    >>> y = np.arange(3, dtype=np.float)
    >>> y
    array(\[ 0.,  1.,  2.\])
    >>> np.ones\_like(y)
    array(\[ 1.,  1.,  1.\])

numpy.reshape

Help on function reshape in numpy:

numpy.reshape = reshape(a, newshape, order='C')
    Gives a new shape to an array without changing its data.
    
    Parameters
    ----------
    a : array\_like
        Array to be reshaped.
    newshape : int or tuple of ints
        The new shape should be compatible with the original shape. If
        an integer, then the result will be a 1-D array of that length.
        One shape dimension can be -1. In this case, the value is inferred
        from the length of the array and remaining dimensions.
    order : {'C', 'F', 'A'}, optional
        Read the elements of \`a\` using this index order, and place the elements
        into the reshaped array using this index order.  'C' means to
        read / write the elements using C-like index order, with the last axis index
        changing fastest, back to the first axis index changing slowest.  'F'
        means to read / write the elements using Fortran-like index order, with
        the first index changing fastest, and the last index changing slowest.
        Note that the 'C' and 'F' options take no account of the memory layout
        of the underlying array, and only refer to the order of indexing.  'A'
        means to read / write the elements in Fortran-like index order if \`a\` is
        Fortran \*contiguous\* in memory, C-like order otherwise.
    
    Returns
    -------
    reshaped\_array : ndarray
        This will be a new view object if possible; otherwise, it will
        be a copy.  Note there is no guarantee of the \*memory layout\* (C- or
        Fortran- contiguous) of the returned array.
    
    See Also
    --------
    ndarray.reshape : Equivalent method.
    
    Notes
    -----
    It is not always possible to change the shape of an array without
    copying the data. If you want an error to be raise if the data is copied,
    you should assign the new shape to the shape attribute of the array::
    
     >>> a = np.zeros((10, 2))
     # A transpose make the array non-contiguous
     >>> b = a.T
     # Taking a view makes it possible to modify the shape without modifying the
     # initial object.
     >>> c = b.view()
     >>> c.shape = (20)
     AttributeError: incompatible shape for a non-contiguous array
    
    The \`order\` keyword gives the index ordering both for \*fetching\* the values
    from \`a\`, and then \*placing\* the values into the output array.  For example,
    let's say you have an array:
    
    >>> a = np.arange(6).reshape((3, 2))
    >>> a
    array(\[\[0, 1\],
           \[2, 3\],
           \[4, 5\]\])
    
    You can think of reshaping as first raveling the array (using the given
    index order), then inserting the elements from the raveled array into the
    new array using the same kind of index ordering as was used for the
    raveling.
    
    >>> np.reshape(a, (2, 3)) # C-like index ordering
    array(\[\[0, 1, 2\],
           \[3, 4, 5\]\])
    >>> np.reshape(np.ravel(a), (2, 3)) # equivalent to C ravel then C reshape
    array(\[\[0, 1, 2\],
           \[3, 4, 5\]\])
    >>> np.reshape(a, (2, 3), order='F') # Fortran-like index ordering
    array(\[\[0, 4, 3\],
           \[2, 1, 5\]\])
    >>> np.reshape(np.ravel(a, order='F'), (2, 3), order='F')
    array(\[\[0, 4, 3\],
           \[2, 1, 5\]\])
    
    Examples
    --------
    >>> a = np.array(\[\[1,2,3\], \[4,5,6\]\])
    >>> np.reshape(a, 6)
    array(\[1, 2, 3, 4, 5, 6\])
    >>> np.reshape(a, 6, order='F')
    array(\[1, 4, 2, 5, 3, 6\])
    
    >>> np.reshape(a, (3,-1))       # the unspecified value is inferred to be 2
    array(\[\[1, 2\],
           \[3, 4\],
           \[5, 6\]\])

numpy.sin

sin(x\[, out\])

Trigonometric sine, element-wise.

Parameters
----------
x : array\_like
    Angle, in radians (:math:\`2 pi\` rad equals 360 degrees).

Returns
-------
y : array\_like
    The sine of each element of x.

See Also
--------
arcsin, sinh, cos

Notes
-----
The sine is one of the fundamental functions of trigonometry (the
mathematical study of triangles).  Consider a circle of radius 1
centered on the origin.  A ray comes in from the :math:\`+x\` axis, makes
an angle at the origin (measured counter-clockwise from that axis), and
departs from the origin.  The :math:\`y\` coordinate of the outgoing
ray's intersection with the unit circle is the sine of that angle.  It
ranges from -1 for :math:\`x=3pi / 2\` to +1 for :math:\`pi / 2.\`  The
function has zeroes where the angle is a multiple of :math:\`pi\`.
Sines of angles between :math:\`pi\` and :math:\`2pi\` are negative.
The numerous properties of the sine and related functions are included
in any standard trigonometry text.

Examples
--------
Print sine of one angle:

>>> np.sin(np.pi/2.)
1.0

Print sines of an array of angles given in degrees:

>>> np.sin(np.array((0., 30., 45., 60., 90.)) \* np.pi / 180. )
array(\[ 0.        ,  0.5       ,  0.70710678,  0.8660254 ,  1.        \])

Plot the sine function:

>>> import matplotlib.pylab as plt
>>> x = np.linspace(-np.pi, np.pi, 201)
>>> plt.plot(x, np.sin(x))
>>> plt.xlabel('Angle \[rad\]')
>>> plt.ylabel('sin(x)')
>>> plt.axis('tight')
>>> plt.show()

numpy.sinh

sinh(x\[, out\])

Hyperbolic sine, element-wise.

Equivalent to \`\`1/2 \* (np.exp(x) - np.exp(-x))\`\` or
\`\`-1j \* np.sin(1j\*x)\`\`.

Parameters
----------
x : array\_like
    Input array.
out : ndarray, optional
    Output array of same shape as \`x\`.

Returns
-------
y : ndarray
    The corresponding hyperbolic sine values.

Raises
------
ValueError: invalid return array shape
    if \`out\` is provided and \`out.shape\` != \`x.shape\` (See Examples)

Notes
-----
If \`out\` is provided, the function writes the result into it,
and returns a reference to \`out\`.  (See Examples)

References
----------
M. Abramowitz and I. A. Stegun, Handbook of Mathematical Functions.
New York, NY: Dover, 1972, pg. 83.

Examples
--------
>>> np.sinh(0)
0.0
>>> np.sinh(np.pi\*1j/2)
1j
>>> np.sinh(np.pi\*1j) # (exact value is 0)
1.2246063538223773e-016j
>>> # Discrepancy due to vagaries of floating point arithmetic.

>>> # Example of providing the optional output parameter
>>> out2 = np.sinh(\[0.1\], out1)
>>> out2 is out1
True

>>> # Example of ValueError due to provision of shape mis-matched \`out\`
>>> np.sinh(np.zeros((3,3)),np.zeros((2,2)))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid return array shape

numpy.tan

tan(x\[, out\])

Compute tangent element-wise.

Equivalent to \`\`np.sin(x)/np.cos(x)\`\` element-wise.

Parameters
----------
x : array\_like
  Input array.
out : ndarray, optional
    Output array of same shape as \`x\`.

Returns
-------
y : ndarray
  The corresponding tangent values.

Raises
------
ValueError: invalid return array shape
    if \`out\` is provided and \`out.shape\` != \`x.shape\` (See Examples)

Notes
-----
If \`out\` is provided, the function writes the result into it,
and returns a reference to \`out\`.  (See Examples)

References
----------
M. Abramowitz and I. A. Stegun, Handbook of Mathematical Functions.
New York, NY: Dover, 1972.

Examples
--------
>>> from math import pi
>>> np.tan(np.array(\[-pi,pi/2,pi\]))
array(\[  1.22460635e-16,   1.63317787e+16,  -1.22460635e-16\])
>>>
>>> # Example of providing the optional output parameter illustrating
>>> # that what is returned is a reference to said parameter
>>> out2 = np.cos(\[0.1\], out1)
>>> out2 is out1
True
>>>
>>> # Example of ValueError due to provision of shape mis-matched \`out\`
>>> np.cos(np.zeros((3,3)),np.zeros((2,2)))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid return array shape

numpy.tanh

tanh(x\[, out\])

Compute hyperbolic tangent element-wise.

Equivalent to \`\`np.sinh(x)/np.cosh(x)\`\` or \`\`-1j \* np.tan(1j\*x)\`\`.

Parameters
----------
x : array\_like
    Input array.
out : ndarray, optional
    Output array of same shape as \`x\`.

Returns
-------
y : ndarray
    The corresponding hyperbolic tangent values.

Raises
------
ValueError: invalid return array shape
    if \`out\` is provided and \`out.shape\` != \`x.shape\` (See Examples)

Notes
-----
If \`out\` is provided, the function writes the result into it,
and returns a reference to \`out\`.  (See Examples)

References
----------
.. \[1\] M. Abramowitz and I. A. Stegun, Handbook of Mathematical Functions.
       New York, NY: Dover, 1972, pg. 83.
       http://www.math.sfu.ca/~cbm/aands/

.. \[2\] Wikipedia, "Hyperbolic function",
       http://en.wikipedia.org/wiki/Hyperbolic\_function

Examples
--------
>>> np.tanh((0, np.pi\*1j, np.pi\*1j/2))
array(\[ 0. +0.00000000e+00j,  0. -1.22460635e-16j,  0. +1.63317787e+16j\])

>>> # Example of providing the optional output parameter illustrating
>>> # that what is returned is a reference to said parameter
>>> out2 = np.tanh(\[0.1\], out1)
>>> out2 is out1
True

>>> # Example of ValueError due to provision of shape mis-matched \`out\`
>>> np.tanh(np.zeros((3,3)),np.zeros((2,2)))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid return array shape

numpy.tolist

no Python documentation found for 'numpy.tolist'

numpy.zeros

Help on built-in function zeros in numpy:

numpy.zeros = zeros(...)
    zeros(shape, dtype=float, order='C')
    
    Return a new array of given shape and type, filled with zeros.
    
    Parameters
    ----------
    shape : int or sequence of ints
        Shape of the new array, e.g., \`\`(2, 3)\`\` or \`\`2\`\`.
    dtype : data-type, optional
        The desired data-type for the array, e.g., \`numpy.int8\`.  Default is
        \`numpy.float64\`.
    order : {'C', 'F'}, optional
        Whether to store multidimensional data in C- or Fortran-contiguous
        (row- or column-wise) order in memory.
    
    Returns
    -------
    out : ndarray
        Array of zeros with the given shape, dtype, and order.
    
    See Also
    --------
    zeros\_like : Return an array of zeros with shape and type of input.
    ones\_like : Return an array of ones with shape and type of input.
    empty\_like : Return an empty array with shape and type of input.
    ones : Return a new array setting values to one.
    empty : Return a new uninitialized array.
    
    Examples
    --------
    >>> np.zeros(5)
    array(\[ 0.,  0.,  0.,  0.,  0.\])
    
    >>> np.zeros((5,), dtype=numpy.int)
    array(\[0, 0, 0, 0, 0\])
    
    >>> np.zeros((2, 1))
    array(\[\[ 0.\],
           \[ 0.\]\])
    
    >>> s = (2,2)
    >>> np.zeros(s)
    array(\[\[ 0.,  0.\],
           \[ 0.,  0.\]\])
    
    >>> np.zeros((2,), dtype=\[('x', 'i4'), ('y', 'i4')\]) # custom dtype
    array(\[(0, 0), (0, 0)\],
          dtype=\[('x', '<i4'), ('y', '<i4')\])

[operator](https://trinket.io/docs/python#operator)

operator.abs

Help on built-in function abs in operator:

operator.abs = abs(...)
    abs(a) -- Same as abs(a).

operator.add

Help on built-in function add in operator:

operator.add = add(...)
    add(a, b) -- Same as a + b.

operator.and\_

Help on built-in function and\_ in operator:

operator.and\_ = and\_(...)
    and\_(a, b) -- Same as a & b.

operator.concat

Help on built-in function concat in operator:

operator.concat = concat(...)
    concat(a, b) -- Same as a + b, for a and b sequences.

operator.contains

Help on built-in function contains in operator:

operator.contains = contains(...)
    contains(a, b) -- Same as b in a (note reversed operands).

operator.countOf

Help on built-in function countOf in operator:

operator.countOf = countOf(...)
    countOf(a, b) -- Return the number of times b occurs in a.

operator.delitem

Help on built-in function delitem in operator:

operator.delitem = delitem(...)
    delitem(a, b) -- Same as del a\[b\].

operator.div

Help on built-in function div in operator:

operator.div = div(...)
    div(a, b) -- Same as a / b when \_\_future\_\_.division is not in effect.

operator.eq

Help on built-in function eq in operator:

operator.eq = eq(...)
    eq(a, b) -- Same as a==b.

operator.floordiv

Help on built-in function floordiv in operator:

operator.floordiv = floordiv(...)
    floordiv(a, b) -- Same as a // b.

operator.ge

Help on built-in function ge in operator:

operator.ge = ge(...)
    ge(a, b) -- Same as a>=b.

operator.getitem

Help on built-in function getitem in operator:

operator.getitem = getitem(...)
    getitem(a, b) -- Same as a\[b\].

operator.gt

Help on built-in function gt in operator:

operator.gt = gt(...)
    gt(a, b) -- Same as a>b.

operator.index

Help on built-in function index in operator:

operator.index = index(...)
    index(a) -- Same as a.\_\_index\_\_()

operator.indexOf

Help on built-in function indexOf in operator:

operator.indexOf = indexOf(...)
    indexOf(a, b) -- Return the first index of b in a.

operator.inv

Help on built-in function inv in operator:

operator.inv = inv(...)
    inv(a) -- Same as ~a.

operator.is\_

Help on built-in function is\_ in operator:

operator.is\_ = is\_(...)
    is\_(a, b) -- Same as a is b.

operator.is\_not

Help on built-in function is\_not in operator:

operator.is\_not = is\_not(...)
    is\_not(a, b) -- Same as a is not b.

operator.le

Help on built-in function le in operator:

operator.le = le(...)
    le(a, b) -- Same as a<=b.

operator.lshift

Help on built-in function lshift in operator:

operator.lshift = lshift(...)
    lshift(a, b) -- Same as a << b.

operator.lt

Help on built-in function lt in operator:

operator.lt = lt(...)
    lt(a, b) -- Same as a<b.

operator.mod

Help on built-in function mod in operator:

operator.mod = mod(...)
    mod(a, b) -- Same as a % b.

operator.mul

Help on built-in function mul in operator:

operator.mul = mul(...)
    mul(a, b) -- Same as a \* b.

operator.ne

Help on built-in function ne in operator:

operator.ne = ne(...)
    ne(a, b) -- Same as a!=b.

operator.neg

Help on built-in function neg in operator:

operator.neg = neg(...)
    neg(a) -- Same as -a.

operator.not\_

Help on built-in function not\_ in operator:

operator.not\_ = not\_(...)
    not\_(a) -- Same as not a.

operator.or\_

Help on built-in function or\_ in operator:

operator.or\_ = or\_(...)
    or\_(a, b) -- Same as a | b.

operator.pos

Help on built-in function pos in operator:

operator.pos = pos(...)
    pos(a) -- Same as +a.

operator.pow

Help on built-in function pow in operator:

operator.pow = pow(...)
    pow(a, b) -- Same as a \*\* b.

operator.rshift

Help on built-in function rshift in operator:

operator.rshift = rshift(...)
    rshift(a, b) -- Same as a >> b.

operator.setitem

Help on built-in function setitem in operator:

operator.setitem = setitem(...)
    setitem(a, b, c) -- Same as a\[b\] = c.

operator.sub

Help on built-in function sub in operator:

operator.sub = sub(...)
    sub(a, b) -- Same as a - b.

operator.truth

Help on built-in function truth in operator:

operator.truth = truth(...)
    truth(a) -- Return True if a is true, False otherwise.

operator.xor

Help on built-in function xor in operator:

operator.xor = xor(...)
    xor(a, b) -- Same as a ^ b.

[processing](https://trinket.io/docs/python#processing)

processing.arc

no Python documentation found for 'processing.arc'

processing.background

no Python documentation found for 'processing.background'

processing.blue

no Python documentation found for 'processing.blue'

processing.colorMode

no Python documentation found for 'processing.colorMode'

processing.ellipse

no Python documentation found for 'processing.ellipse'

processing.ellipseMode

no Python documentation found for 'processing.ellipseMode'

processing.exitp

no Python documentation found for 'processing.exitp'

processing.fill

no Python documentation found for 'processing.fill'

processing.frameRate

no Python documentation found for 'processing.frameRate'

processing.get

no Python documentation found for 'processing.get'

processing.green

no Python documentation found for 'processing.green'

processing.image

no Python documentation found for 'processing.image'

processing.line

no Python documentation found for 'processing.line'

processing.loadImage

no Python documentation found for 'processing.loadImage'

processing.loadPixels

no Python documentation found for 'processing.loadPixels'

processing.loop

no Python documentation found for 'processing.loop'

processing.mouseX

no Python documentation found for 'processing.mouseX'

processing.mouseY

no Python documentation found for 'processing.mouseY'

processing.noFill

no Python documentation found for 'processing.noFill'

processing.noLoop

no Python documentation found for 'processing.noLoop'

processing.noSmooth

no Python documentation found for 'processing.noSmooth'

processing.noStroke

no Python documentation found for 'processing.noStroke'

processing.point

no Python documentation found for 'processing.point'

processing.quad

no Python documentation found for 'processing.quad'

processing.rect

no Python documentation found for 'processing.rect'

processing.rectMode

no Python documentation found for 'processing.rectMode'

processing.red

no Python documentation found for 'processing.red'

processing.rotate

no Python documentation found for 'processing.rotate'

processing.run

no Python documentation found for 'processing.run'

processing.scale

no Python documentation found for 'processing.scale'

processing.set

no Python documentation found for 'processing.set'

processing.size

no Python documentation found for 'processing.size'

processing.smooth

no Python documentation found for 'processing.smooth'

processing.stroke

no Python documentation found for 'processing.stroke'

processing.strokeCap

no Python documentation found for 'processing.strokeCap'

processing.strokeJoin

no Python documentation found for 'processing.strokeJoin'

processing.strokeWeight

no Python documentation found for 'processing.strokeWeight'

processing.text

no Python documentation found for 'processing.text'

processing.translate

no Python documentation found for 'processing.translate'

processing.triangle

no Python documentation found for 'processing.triangle'

[pygal](https://trinket.io/docs/python#pygal)

Overview

pygal is a dynamic charting library for python. A variety of chart types are available including:

*   Line
*   StackedLine
*   Bar
*   StackedBar
*   HorizontalBar
*   StackedHorizontalBar
*   XY
*   Radar
*   Pie

We've included an example of each chart type below.

pygal.Bar

 Example

pygal.HorizontalBar

 Example

pygal.Line

 Example

pygal.Pie

 Example

pygal.Radar

 Example

pygal.StackedBar

 Example

pygal.StackedHorizontalBar

pygal.StackedLine

 Example

pygal.XY

 Example

pygal.add

pygal.render

[random](https://trinket.io/docs/python#random)

random.choice

Help on method choice in random:

random.choice = choice(self, seq) method of random.Random instance
    Choose a random element from a non-empty sequence.

random.randint

Help on method randint in random:

random.randint = randint(self, a, b) method of random.Random instance
    Return random integer in range \[a, b\], including both end points.

random.random

Help on built-in function random in random:

random.random = random(...)
    random() -> x in the interval \[0, 1).

random.randrange

Help on method randrange in random:

random.randrange = randrange(self, start, stop=None, step=1, \_int=<type 'int'>, \_maxwidth=9007199254740992L) method of random.Random instance
    Choose a random item from range(start, stop\[, step\]).
    
    This fixes the problem with randint() which includes the
    endpoint; in Python this is usually not what you want.

random.seed

Help on method seed in random:

random.seed = seed(self, a=None) method of random.Random instance
    Initialize internal state from hashable object.
    
    None or no argument seeds from current time or from an operating
    system specific randomness source if available.
    
    If a is not None or an int or long, hash(a) is used instead.

random.shuffle

Help on method shuffle in random:

random.shuffle = shuffle(self, x, random=None) method of random.Random instance
    x, random=random.random -> shuffle list x in place; return None.
    
    Optional arg random is a 0-argument function returning a random
    float in \[0.0, 1.0); by default, the standard random.random.

[re](https://trinket.io/docs/python#re)

Overview

This module provides regular expression matching operations similar to those found in Perl. Both patterns and strings to be searched can be Unicode strings as well as 8-bit strings.  
  
Regular expressions use the backslash character ('\\') to indicate special forms or to allow special characters to be used without invoking their special meaning. This collides with Python’s usage of the same character for the same purpose in string literals; for example, to match a literal backslash, one might have to write '\\\\\\\\' as the pattern string, because the regular expression must be \\\\, and each backslash must be expressed as \\\\ inside a regular Python string literal.  
  
The solution is to use Python’s raw string notation for regular expression patterns; backslashes are not handled in any special way in a string literal prefixed with 'r'. So r"\\n" is a two-character string containing '\\' and 'n', while "\\n" is a one-character string containing a newline. Usually patterns will be expressed in Python code using this raw string notation.  
  
It is important to note that most regular expression operations are available as module-level functions and RegexObject methods. The functions are shortcuts that don’t require you to compile a regex object first, but miss some fine-tuning parameters.  
  
See [https://docs.python.org/2/library/re.html](https://docs.python.org/2/library/re.html) and [https://docs.python.org/2/howto/regex.html](https://docs.python.org/2/howto/regex.html) for detailed information about regular expressions.

 Example

re.group

Returns one or more subgroups of the match. If there is a single argument, the result is a single string; if there are multiple arguments, the result is a tuple with one item per argument. Without arguments, group1 defaults to zero (the whole match is returned). If a groupN argument is zero, the corresponding return value is the entire matching string; if it is in the inclusive range \[1..99\], it is the string matching the corresponding parenthesized group. If a group number is negative or larger than the number of groups defined in the pattern, an IndexError exception is raised. If a group is contained in a part of the pattern that did not match, the corresponding result is None. If a group is contained in a part of the pattern that matched multiple times, the last match is returned.

re.groups

Return a tuple containing all the subgroups of the match, from 1 up to however many groups are in the pattern. The default argument is used for groups that did not participate in the match; it defaults to None.

re.match

Help on function match in re:

re.match = match(pattern, string, flags=0)
    Try to apply the pattern at the start of the string, returning
    a match object, or None if no match was found.

re.search

Help on function search in re:

re.search = search(pattern, string, flags=0)
    Scan through string looking for a match to the pattern, returning
    a match object, or None if no match was found.

[string](https://trinket.io/docs/python#string)

 Example

string.capitalize

Help on function capitalize in string:

string.capitalize = capitalize(s)
    capitalize(s) -> string
    
    Return a copy of the string s with only its first character
    capitalized.

string.capwords

Help on function capwords in string:

string.capwords = capwords(s, sep=None)
    capwords(s \[,sep\]) -> string
    
    Split the argument into words using split, capitalize each
    word using capitalize, and join the capitalized words using
    join.  If the optional second argument sep is absent or None,
    runs of whitespace characters are replaced by a single space
    and leading and trailing whitespace are removed, otherwise
    sep is used to split and join the words.

string.join

Help on function join in string:

string.join = join(words, sep=' ')
    join(list \[,sep\]) -> string
    
    Return a string composed of the words in list, with
    intervening occurrences of sep.  The default separator is a
    single space.
    
    (joinfields and join are synonymous)

string.split

Help on function split in string:

string.split = split(s, sep=None, maxsplit=-1)
    split(s \[,sep \[,maxsplit\]\]) -> list of strings
    
    Return a list of the words in the string s, using sep as the
    delimiter string.  If maxsplit is given, splits at no more than
    maxsplit places (resulting in at most maxsplit+1 words).  If sep
    is not specified or is None, any whitespace string is a separator.
    
    (split and splitfields are synonymous)

[time](https://trinket.io/docs/python#time)

time.time

Help on built-in function time in time:

time.time = time(...)
    time() -> floating point number
    
    Return the current time in seconds since the Epoch.
    Fractions of a second may be present if the system clock provides them.

 Example

[turtle](https://trinket.io/docs/python#turtle)

 Example

turtle.back

Help on function back in turtle:

turtle.back = back(distance)
    Move the turtle backward by distance.
    
    Aliases: back | backward | bk
    
    Argument:
    distance -- a number
    
    Move the turtle backward by distance ,opposite to the direction the
    turtle is headed. Do not change the turtle's heading.
    
    Example:
    >>> position()
    (0.00, 0.00)
    >>> backward(30)
    >>> position()
    (-30.00, 0.00)

turtle.backward

Help on function backward in turtle:

turtle.backward = backward(distance)
    Move the turtle backward by distance.
    
    Aliases: back | backward | bk
    
    Argument:
    distance -- a number
    
    Move the turtle backward by distance ,opposite to the direction the
    turtle is headed. Do not change the turtle's heading.
    
    Example:
    >>> position()
    (0.00, 0.00)
    >>> backward(30)
    >>> position()
    (-30.00, 0.00)

turtle.begin\_fill

Help on function begin\_fill in turtle:

turtle.begin\_fill = begin\_fill()
    Called just before drawing a shape to be filled.
    
    No argument.
    
    Example:
    >>> begin\_fill()
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> end\_fill()

turtle.bgcolor

Help on function bgcolor in turtle:

turtle.bgcolor = bgcolor(\*args)
    Set or return backgroundcolor of the TurtleScreen.
    
    Arguments (if given): a color string or three numbers
    in the range 0..colormode or a 3-tuple of such numbers.
    
    Example:
    >>> bgcolor("orange")
    >>> bgcolor()
    'orange'
    >>> bgcolor(0.5,0,0.5)
    >>> bgcolor()
    '#800080'

turtle.bk

Help on function bk in turtle:

turtle.bk = bk(distance)
    Move the turtle backward by distance.
    
    Aliases: back | backward | bk
    
    Argument:
    distance -- a number
    
    Move the turtle backward by distance ,opposite to the direction the
    turtle is headed. Do not change the turtle's heading.
    
    Example:
    >>> position()
    (0.00, 0.00)
    >>> backward(30)
    >>> position()
    (-30.00, 0.00)

turtle.circle

Help on function circle in turtle:

turtle.circle = circle(radius, extent=None, steps=None)
    Draw a circle with given radius.
    
    Arguments:
    radius -- a number
    extent (optional) -- a number
    steps (optional) -- an integer
    
    Draw a circle with given radius. The center is radius units left
    of the turtle; extent - an angle - determines which part of the
    circle is drawn. If extent is not given, draw the entire circle.
    If extent is not a full circle, one endpoint of the arc is the
    current pen position. Draw the arc in counterclockwise direction
    if radius is positive, otherwise in clockwise direction. Finally
    the direction of the turtle is changed by the amount of extent.
    
    As the circle is approximated by an inscribed regular polygon,
    steps determines the number of steps to use. If not given,
    it will be calculated automatically. Maybe used to draw regular
    polygons.
    
    call: circle(radius)                  # full circle
    --or: circle(radius, extent)          # arc
    --or: circle(radius, extent, steps)
    --or: circle(radius, steps=6)         # 6-sided polygon
    
    Example:
    >>> circle(50)
    >>> circle(120, 180)  # semicircle

turtle.clear

Help on function clear in turtle:

turtle.clear = clear()
    Delete the turtle's drawings from the screen. Do not move 
    
    No arguments.
    
    Delete the turtle's drawings from the screen. Do not move 
    State and position of the turtle as well as drawings of other
    turtles are not affected.
    
    Examples:
    >>> clear()

turtle.clear

Help on function clear in turtle:

turtle.clear = clear()
    Delete the turtle's drawings from the screen. Do not move 
    
    No arguments.
    
    Delete the turtle's drawings from the screen. Do not move 
    State and position of the turtle as well as drawings of other
    turtles are not affected.
    
    Examples:
    >>> clear()

turtle.color

Help on function color in turtle:

turtle.color = color(\*args)
    Return or set the pencolor and fillcolor.
    
    Arguments:
    Several input formats are allowed.
    They use 0, 1, 2, or 3 arguments as follows:
    
    color()
        Return the current pencolor and the current fillcolor
        as a pair of color specification strings as are returned
        by pencolor and fillcolor.
    color(colorstring), color((r,g,b)), color(r,g,b)
        inputs as in pencolor, set both, fillcolor and pencolor,
        to the given value.
    color(colorstring1, colorstring2),
    color((r1,g1,b1), (r2,g2,b2))
        equivalent to pencolor(colorstring1) and fillcolor(colorstring2)
        and analogously, if the other input format is used.
    
    If turtleshape is a polygon, outline and interior of that polygon
    is drawn with the newly set colors.
    For mor info see: pencolor, fillcolor
    
    Example:
    >>> color('red', 'green')
    >>> color()
    ('red', 'green')
    >>> colormode(255)
    >>> color((40, 80, 120), (160, 200, 240))
    >>> color()
    ('#285078', '#a0c8f0')

turtle.colormode

Help on function colormode in turtle:

turtle.colormode = colormode(cmode=None)
    Return the colormode or set it to 1.0 or 255.
    
    Optional argument:
    cmode -- one of the values 1.0 or 255
    
    r, g, b values of colortriples have to be in range 0..cmode.
    
    Example:
    >>> colormode()
    1.0
    >>> colormode(255)
    >>> pencolor(240,160,80)

turtle.delay

Help on function delay in turtle:

turtle.delay = delay(delay=None)
    Return or set the drawing delay in milliseconds.
    
    Optional argument:
    delay -- positive integer
    
    Example:
    >>> delay(15)
    >>> delay()
    15

turtle.distance

Help on function distance in turtle:

turtle.distance = distance(x, y=None)
    Return the distance from the turtle to (x,y) in turtle step units.
    
    Arguments:
    x -- a number   or  a pair/vector of numbers   or   a turtle instance
    y -- a number       None                            None
    
    call: distance(x, y)         # two coordinates
    --or: distance((x, y))       # a pair (tuple) of coordinates
    --or: distance(vec)          # e.g. as returned by pos()
    --or: distance(mypen)        # where mypen is another turtle
    
    Example:
    >>> pos()
    (0.00, 0.00)
    >>> distance(30,40)
    50.0
    >>> pen = Turtle()
    >>> pen.forward(77)
    >>> distance(pen)
    77.0

turtle.dot

Help on function dot in turtle:

turtle.dot = dot(size=None, \*color)
    Draw a dot with diameter size, using color.
    
    Optional arguments:
    size -- an integer >= 1 (if given)
    color -- a colorstring or a numeric color tuple
    
    Draw a circular dot with diameter size, using color.
    If size is not given, the maximum of pensize+4 and 2\*pensize is used.
    
    Example:
    >>> dot()
    >>> fd(50); dot(20, "blue"); fd(50)

turtle.down

Help on function down in turtle:

turtle.down = down()
    Pull the pen down -- drawing when moving.
    
    Aliases: pendown | pd | down
    
    No argument.
    
    Example:
    >>> pendown()

turtle.end\_fill

Help on function end\_fill in turtle:

turtle.end\_fill = end\_fill()
    Fill the shape drawn after the call begin\_fill().
    
    No argument.
    
    Example:
    >>> begin\_fill()
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> end\_fill()

turtle.exitonclick

Help on function exitonclick in turtle:

turtle.exitonclick = exitonclick()
    Go into mainloop until the mouse is clicked.
    
    No arguments.
    
    Bind bye() method to mouseclick on TurtleScreen.
    If "using\_IDLE" - value in configuration dictionary is False
    (default value), enter mainloop.
    If IDLE with -n switch (no subprocess) is used, this value should be
    set to True in turtle.cfg. In this case IDLE's mainloop
    is active also for the client script.
    
    This is a method of the Screen-class and not available for
    TurtleScreen instances.
    
    Example:
    >>> exitonclick()

turtle.fd

Help on function fd in turtle:

turtle.fd = fd(distance)
    Move the turtle forward by the specified distance.
    
    Aliases: forward | fd
    
    Argument:
    distance -- a number (integer or float)
    
    Move the turtle forward by the specified distance, in the direction
    the turtle is headed.
    
    Example:
    >>> position()
    (0.00, 0.00)
    >>> forward(25)
    >>> position()
    (25.00,0.00)
    >>> forward(-75)
    >>> position()
    (-50.00,0.00)

turtle.fill

Help on function fill in turtle:

turtle.fill = fill(flag=None)
    Call fill(True) before drawing a shape to fill, fill(False) when done.
    
    Optional argument:
    flag -- True/False (or 1/0 respectively)
    
    Call fill(True) before drawing the shape you want to fill,
    and  fill(False) when done.
    When used without argument: return fillstate (True if filling,
    False else)
    
    Example:
    >>> fill(True)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> left(90)
    >>> forward(100)
    >>> fill(False)

turtle.fillcolor

Help on function fillcolor in turtle:

turtle.fillcolor = fillcolor(\*args)
    Return or set the fillcolor.
    
    Arguments:
    Four input formats are allowed:
      - fillcolor()
        Return the current fillcolor as color specification string,
        possibly in hex-number format (see example).
        May be used as input to another color/pencolor/fillcolor call.
      - fillcolor(colorstring)
        s is a Tk color specification string, such as "red" or "yellow"
      - fillcolor((r, g, b))
        \*a tuple\* of r, g, and b, which represent, an RGB color,
        and each of r, g, and b are in the range 0..colormode,
        where colormode is either 1.0 or 255
      - fillcolor(r, g, b)
        r, g, and b represent an RGB color, and each of r, g, and b
        are in the range 0..colormode
    
    If turtleshape is a polygon, the interior of that polygon is drawn
    with the newly set fillcolor.
    
    Example:
    >>> fillcolor('violet')
    >>> col = pencolor()
    >>> fillcolor(col)
    >>> fillcolor(0, .5, 0)

turtle.forward

Help on function forward in turtle:

turtle.forward = forward(distance)
    Move the turtle forward by the specified distance.
    
    Aliases: forward | fd
    
    Argument:
    distance -- a number (integer or float)
    
    Move the turtle forward by the specified distance, in the direction
    the turtle is headed.
    
    Example:
    >>> position()
    (0.00, 0.00)
    >>> forward(25)
    >>> position()
    (25.00,0.00)
    >>> forward(-75)
    >>> position()
    (-50.00,0.00)

turtle.goto\_$rw$

no Python documentation found for 'turtle.goto\_$'

turtle.heading

Help on function heading in turtle:

turtle.heading = heading()
    Return the turtle's current heading.
    
    No arguments.
    
    Example:
    >>> left(67)
    >>> heading()
    67.0

turtle.hideturtle

Help on function hideturtle in turtle:

turtle.hideturtle = hideturtle()
    Makes the turtle invisible.
    
    Aliases: hideturtle | ht
    
    No argument.
    
    It's a good idea to do this while you're in the
    middle of a complicated drawing, because hiding
    the turtle speeds up the drawing observably.
    
    Example:
    >>> hideturtle()

turtle.home

Help on function home in turtle:

turtle.home = home()
    Move turtle to the origin - coordinates (0,0).
    
    No arguments.
    
    Move turtle to the origin - coordinates (0,0) and set its
    heading to its start-orientation (which depends on mode).
    
    Example:
    >>> home()

turtle.ht

Help on function ht in turtle:

turtle.ht = ht()
    Makes the turtle invisible.
    
    Aliases: hideturtle | ht
    
    No argument.
    
    It's a good idea to do this while you're in the
    middle of a complicated drawing, because hiding
    the turtle speeds up the drawing observably.
    
    Example:
    >>> hideturtle()

turtle.isdown

Help on function isdown in turtle:

turtle.isdown = isdown()
    Return True if pen is down, False if it's up.
    
    No argument.
    
    Example:
    >>> penup()
    >>> isdown()
    False
    >>> pendown()
    >>> isdown()
    True

turtle.isvisible

Help on function isvisible in turtle:

turtle.isvisible = isvisible()
    Return True if the Turtle is shown, False if it's hidden.
    
    No argument.
    
    Example:
    >>> hideturtle()
    >>> print isvisible():
    False

turtle.left

Help on function left in turtle:

turtle.left = left(angle)
    Turn turtle left by angle units.
    
    Aliases: left | lt
    
    Argument:
    angle -- a number (integer or float)
    
    Turn turtle left by angle units. (Units are by default degrees,
    but can be set via the degrees() and radians() functions.)
    Angle orientation depends on mode. (See this.)
    
    Example:
    >>> heading()
    22.0
    >>> left(45)
    >>> heading()
    67.0

turtle.lt

Help on function lt in turtle:

turtle.lt = lt(angle)
    Turn turtle left by angle units.
    
    Aliases: left | lt
    
    Argument:
    angle -- a number (integer or float)
    
    Turn turtle left by angle units. (Units are by default degrees,
    but can be set via the degrees() and radians() functions.)
    Angle orientation depends on mode. (See this.)
    
    Example:
    >>> heading()
    22.0
    >>> left(45)
    >>> heading()
    67.0

turtle.pd

Help on function pd in turtle:

turtle.pd = pd()
    Pull the pen down -- drawing when moving.
    
    Aliases: pendown | pd | down
    
    No argument.
    
    Example:
    >>> pendown()

turtle.pencolor

Help on function pencolor in turtle:

turtle.pencolor = pencolor(\*args)
    Return or set the pencolor.
    
    Arguments:
    Four input formats are allowed:
      - pencolor()
        Return the current pencolor as color specification string,
        possibly in hex-number format (see example).
        May be used as input to another color/pencolor/fillcolor call.
      - pencolor(colorstring)
        s is a Tk color specification string, such as "red" or "yellow"
      - pencolor((r, g, b))
        \*a tuple\* of r, g, and b, which represent, an RGB color,
        and each of r, g, and b are in the range 0..colormode,
        where colormode is either 1.0 or 255
      - pencolor(r, g, b)
        r, g, and b represent an RGB color, and each of r, g, and b
        are in the range 0..colormode
    
    If turtleshape is a polygon, the outline of that polygon is drawn
    with the newly set pencolor.
    
    Example:
    >>> pencolor('brown')
    >>> tup = (0.2, 0.8, 0.55)
    >>> pencolor(tup)
    >>> pencolor()
    '#33cc8c'

turtle.pendown

Help on function pendown in turtle:

turtle.pendown = pendown()
    Pull the pen down -- drawing when moving.
    
    Aliases: pendown | pd | down
    
    No argument.
    
    Example:
    >>> pendown()

turtle.pensize

Help on function pensize in turtle:

turtle.pensize = pensize(width=None)
    Set or return the line thickness.
    
    Aliases:  pensize | width
    
    Argument:
    width -- positive number
    
    Set the line thickness to width or return it. If resizemode is set
    to "auto" and turtleshape is a polygon, that polygon is drawn with
    the same line thickness. If no argument is given, current pensize
    is returned.
    
    Example:
    >>> pensize()
    1
    >>> pensize(10)   # from here on lines of width 10 are drawn

turtle.penup

Help on function penup in turtle:

turtle.penup = penup()
    Pull the pen up -- no drawing when moving.
    
    Aliases: penup | pu | up
    
    No argument
    
    Example:
    >>> penup()

turtle.pos

Help on function pos in turtle:

turtle.pos = pos()
    Return the turtle's current location (x,y), as a Vec2D-vector.
    
    Aliases: pos | position
    
    No arguments.
    
    Example:
    >>> pos()
    (0.00, 240.00)

turtle.position

Help on function position in turtle:

turtle.position = position()
    Return the turtle's current location (x,y), as a Vec2D-vector.
    
    Aliases: pos | position
    
    No arguments.
    
    Example:
    >>> pos()
    (0.00, 240.00)

turtle.pu

Help on function pu in turtle:

turtle.pu = pu()
    Pull the pen up -- no drawing when moving.
    
    Aliases: penup | pu | up
    
    No argument
    
    Example:
    >>> penup()

turtle.reset

Help on function reset in turtle:

turtle.reset = reset()
    Delete the turtle's drawings and restore its default values.
    
            No argument.
    ,
            Delete the turtle's drawings from the screen, re-center the turtle
            and set variables to the default values.
    
            Example:
            >>> position()
            (0.00,-22.00)
            >>> heading()
            100.0
            >>> reset()
            >>> position()
            (0.00,0.00)
            >>> heading()
            0.0

turtle.right

Help on function right in turtle:

turtle.right = right(angle)
    Turn turtle right by angle units.
    
    Aliases: right | rt
    
    Argument:
    angle -- a number (integer or float)
    
    Turn turtle right by angle units. (Units are by default degrees,
    but can be set via the degrees() and radians() functions.)
    Angle orientation depends on mode. (See this.)
    
    Example:
    >>> heading()
    22.0
    >>> right(45)
    >>> heading()
    337.0

turtle.rt

Help on function rt in turtle:

turtle.rt = rt(angle)
    Turn turtle right by angle units.
    
    Aliases: right | rt
    
    Argument:
    angle -- a number (integer or float)
    
    Turn turtle right by angle units. (Units are by default degrees,
    but can be set via the degrees() and radians() functions.)
    Angle orientation depends on mode. (See this.)
    
    Example:
    >>> heading()
    22.0
    >>> right(45)
    >>> heading()
    337.0

turtle.seth

Help on function seth in turtle:

turtle.seth = seth(to\_angle)
    Set the orientation of the turtle to to\_angle.
    
    Aliases:  setheading | seth
    
    Argument:
    to\_angle -- a number (integer or float)
    
    Set the orientation of the turtle to to\_angle.
    Here are some common directions in degrees:
    
     standard - mode:          logo-mode:
    -------------------|--------------------
       0 - east                0 - north
      90 - north              90 - east
     180 - west              180 - south
     270 - south             270 - west
    
    Example:
    >>> setheading(90)
    >>> heading()
    90

turtle.setheading

Help on function setheading in turtle:

turtle.setheading = setheading(to\_angle)
    Set the orientation of the turtle to to\_angle.
    
    Aliases:  setheading | seth
    
    Argument:
    to\_angle -- a number (integer or float)
    
    Set the orientation of the turtle to to\_angle.
    Here are some common directions in degrees:
    
     standard - mode:          logo-mode:
    -------------------|--------------------
       0 - east                0 - north
      90 - north              90 - east
     180 - west              180 - south
     270 - south             270 - west
    
    Example:
    >>> setheading(90)
    >>> heading()
    90

turtle.setpos

Help on function setpos in turtle:

turtle.setpos = setpos(x, y=None)
    Move turtle to an absolute position.
    
    Aliases: setpos | setposition | goto:
    
    Arguments:
    x -- a number      or     a pair/vector of numbers
    y -- a number             None
    
    call: goto(x, y)         # two coordinates
    --or: goto((x, y))       # a pair (tuple) of coordinates
    --or: goto(vec)          # e.g. as returned by pos()
    
    Move turtle to an absolute position. If the pen is down,
    a line will be drawn. The turtle's orientation does not change.
    
    Example:
    >>> tp = pos()
    >>> tp
    (0.00, 0.00)
    >>> setpos(60,30)
    >>> pos()
    (60.00,30.00)
    >>> setpos((20,80))
    >>> pos()
    (20.00,80.00)
    >>> setpos(tp)
    >>> pos()
    (0.00,0.00)

turtle.setposition

Help on function setposition in turtle:

turtle.setposition = setposition(x, y=None)
    Move turtle to an absolute position.
    
    Aliases: setpos | setposition | goto:
    
    Arguments:
    x -- a number      or     a pair/vector of numbers
    y -- a number             None
    
    call: goto(x, y)         # two coordinates
    --or: goto((x, y))       # a pair (tuple) of coordinates
    --or: goto(vec)          # e.g. as returned by pos()
    
    Move turtle to an absolute position. If the pen is down,
    a line will be drawn. The turtle's orientation does not change.
    
    Example:
    >>> tp = pos()
    >>> tp
    (0.00, 0.00)
    >>> setpos(60,30)
    >>> pos()
    (60.00,30.00)
    >>> setpos((20,80))
    >>> pos()
    (20.00,80.00)
    >>> setpos(tp)
    >>> pos()
    (0.00,0.00)

turtle.setup

Help on function setup in turtle:

turtle.setup = setup(width=0.5, height=0.75, startx=None, starty=None)
    Set the size and position of the main window.
    
    Arguments:
    width: as integer a size in pixels, as float a fraction of the 
      Default is 50% of 
    height: as integer the height in pixels, as float a fraction of the
       Default is 75% of 
    startx: if positive, starting position in pixels from the left
      edge of the screen, if negative from the right edge
      Default, startx=None is to center window horizontally.
    starty: if positive, starting position in pixels from the top
      edge of the screen, if negative from the bottom edge
      Default, starty=None is to center window vertically.
    
    Examples:
    >>> setup (width=200, height=200, startx=0, starty=0)
    
    sets window to 200x200 pixels, in upper left of screen
    
    >>> setup(width=.75, height=0.5, startx=None, starty=None)
    
    sets window to 75% of screen by 50% of screen and centers

turtle.setworldcoordinates

Help on function setworldcoordinates in turtle:

turtle.setworldcoordinates = setworldcoordinates(llx, lly, urx, ury)
    Set up a user defined coordinate-system.
    
    Arguments:
    llx -- a number, x-coordinate of lower left corner of canvas
    lly -- a number, y-coordinate of lower left corner of canvas
    urx -- a number, x-coordinate of upper right corner of canvas
    ury -- a number, y-coordinate of upper right corner of canvas
    
    Set up user coodinat-system and switch to mode 'world' if necessary.
    This performs a reset. If mode 'world' is already active,
    all drawings are redrawn according to the new coordinates.
    
    But ATTENTION: in user-defined coordinatesystems angles may appear
    distorted. (see Screen.mode())
    
    Example:
    >>> setworldcoordinates(-10,-0.5,50,1.5)
    >>> for \_ in range(36):
    ...     left(10)
    ...     forward(0.5)

turtle.setworldcoordinates

Help on function setworldcoordinates in turtle:

turtle.setworldcoordinates = setworldcoordinates(llx, lly, urx, ury)
    Set up a user defined coordinate-system.
    
    Arguments:
    llx -- a number, x-coordinate of lower left corner of canvas
    lly -- a number, y-coordinate of lower left corner of canvas
    urx -- a number, x-coordinate of upper right corner of canvas
    ury -- a number, y-coordinate of upper right corner of canvas
    
    Set up user coodinat-system and switch to mode 'world' if necessary.
    This performs a reset. If mode 'world' is already active,
    all drawings are redrawn according to the new coordinates.
    
    But ATTENTION: in user-defined coordinatesystems angles may appear
    distorted. (see Screen.mode())
    
    Example:
    >>> setworldcoordinates(-10,-0.5,50,1.5)
    >>> for \_ in range(36):
    ...     left(10)
    ...     forward(0.5)

turtle.setx

Help on function setx in turtle:

turtle.setx = setx(x)
    Set the turtle's first coordinate to x
    
    Argument:
    x -- a number (integer or float)
    
    Set the turtle's first coordinate to x, leave second coordinate
    unchanged.
    
    Example:
    >>> position()
    (0.00, 240.00)
    >>> setx(10)
    >>> position()
    (10.00, 240.00)

turtle.sety

Help on function sety in turtle:

turtle.sety = sety(y)
    Set the turtle's second coordinate to y
    
    Argument:
    y -- a number (integer or float)
    
    Set the turtle's first coordinate to x, second coordinate remains
    unchanged.
    
    Example:
    >>> position()
    (0.00, 40.00)
    >>> sety(-10)
    >>> position()
    (0.00, -10.00)

turtle.shape

Help on function shape in turtle:

turtle.shape = shape(name=None)
    Set turtle shape to shape with given name / return current shapename.
    
    Optional argument:
    name -- a string, which is a valid shapename
    
    Set turtle shape to shape with given name or, if name is not given,
    return name of current shape.
    Shape with name must exist in the TurtleScreen's shape dictionary.
    Initially there are the following polygon shapes:
    'arrow', 'turtle', 'circle', 'square', 'triangle', 'classic'.
    To learn about how to deal with shapes see Screen-method register\_shape.
    
    Example:
    >>> shape()
    'arrow'
    >>> shape("turtle")
    >>> shape()
    'turtle'

turtle.showturtle

Help on function showturtle in turtle:

turtle.showturtle = showturtle()
    Makes the turtle visible.
    
    Aliases: showturtle | st
    
    No argument.
    
    Example:
    >>> hideturtle()
    >>> showturtle()

turtle.speed

Help on function speed in turtle:

turtle.speed = speed(speed=None)
    Return or set the turtle's speed.
    
    Optional argument:
    speed -- an integer in the range 0..10 or a speedstring (see below)
    
    Set the turtle's speed to an integer value in the range 0 .. 10.
    If no argument is given: return current speed.
    
    If input is a number greater than 10 or smaller than 0.5,
    speed is set to 0.
    Speedstrings  are mapped to speedvalues in the following way:
        'fastest' :  0
        'fast'    :  10
        'normal'  :  6
        'slow'    :  3
        'slowest' :  1
    speeds from 1 to 10 enforce increasingly faster animation of
    line drawing and turtle turning.
    
    Attention:
    speed = 0 : \*no\* animation takes place. forward/back makes turtle jump
    and likewise left/right make the turtle turn instantly.
    
    Example:
    >>> speed(3)

turtle.st

Help on function st in turtle:

turtle.st = st()
    Makes the turtle visible.
    
    Aliases: showturtle | st
    
    No argument.
    
    Example:
    >>> hideturtle()
    >>> showturtle()

turtle.stamp

Help on function stamp in turtle:

turtle.stamp = stamp()
    Stamp a copy of the turtleshape onto the canvas and return its id.
    
    No argument.
    
    Stamp a copy of the turtle shape onto the canvas at the current
    turtle position. Return a stamp\_id for that stamp, which can be
    used to delete it by calling clearstamp(stamp\_id).
    
    Example:
    >>> color("blue")
    >>> stamp()
    13
    >>> fd(50)

turtle.title

Help on function title in turtle:

turtle.title = title(titlestring)
    Set title of turtle-window
    
    Argument:
    titlestring -- a string, to appear in the titlebar of the
                   turtle graphics window.
    
    This is a method of Screen-class. Not available for TurtleScreen-
    objects.
    
    Example:
    >>> title("Welcome to the turtle-zoo!")

turtle.towards

Help on function towards in turtle:

turtle.towards = towards(x, y=None)
    Return the angle of the line from the turtle's position to (x, y).
    
    Arguments:
    x -- a number   or  a pair/vector of numbers   or   a turtle instance
    y -- a number       None                            None
    
    call: distance(x, y)         # two coordinates
    --or: distance((x, y))       # a pair (tuple) of coordinates
    --or: distance(vec)          # e.g. as returned by pos()
    --or: distance(mypen)        # where mypen is another turtle
    
    Return the angle, between the line from turtle-position to position
    specified by x, y and the turtle's start orientation. (Depends on
    modes - "standard" or "logo")
    
    Example:
    >>> pos()
    (10.00, 10.00)
    >>> towards(0,0)
    225.0

turtle.tracer

Help on function tracer in turtle:

turtle.tracer = tracer(flag=None, delay=None)
    Turns turtle animation on/off and set delay for update drawings.
    
    Optional arguments:
    n -- nonnegative  integer
    delay -- nonnegative  integer
    
    If n is given, only each n-th regular screen update is really performed.
    (Can be used to accelerate the drawing of complex graphics.)
    Second arguments sets delay value (see RawTurtle.delay())
    
    Example:
    >>> tracer(8, 25)
    >>> dist = 2
    >>> for i in range(200):
    ...     fd(dist)
    ...     rt(90)
    ...     dist += 2

turtle.tracer

Help on function tracer in turtle:

turtle.tracer = tracer(flag=None, delay=None)
    Turns turtle animation on/off and set delay for update drawings.
    
    Optional arguments:
    n -- nonnegative  integer
    delay -- nonnegative  integer
    
    If n is given, only each n-th regular screen update is really performed.
    (Can be used to accelerate the drawing of complex graphics.)
    Second arguments sets delay value (see RawTurtle.delay())
    
    Example:
    >>> tracer(8, 25)
    >>> dist = 2
    >>> for i in range(200):
    ...     fd(dist)
    ...     rt(90)
    ...     dist += 2

turtle.turtles

Help on function turtles in turtle:

turtle.turtles = turtles()
    Return the list of turtles on the 
    
    Example:
    >>> turtles()
    \[<turtle.Turtle object at 0x00E11FB0>\]

turtle.up

Help on function up in turtle:

turtle.up = up()
    Pull the pen up -- no drawing when moving.
    
    Aliases: penup | pu | up
    
    No argument
    
    Example:
    >>> penup()

turtle.update

Help on function update in turtle:

turtle.update = update()
    Perform a TurtleScreen update.

turtle.update

Help on function update in turtle:

turtle.update = update()
    Perform a TurtleScreen update.

turtle.width

Help on function width in turtle:

turtle.width = width(width=None)
    Set or return the line thickness.
    
    Aliases:  pensize | width
    
    Argument:
    width -- positive number
    
    Set the line thickness to width or return it. If resizemode is set
    to "auto" and turtleshape is a polygon, that polygon is drawn with
    the same line thickness. If no argument is given, current pensize
    is returned.
    
    Example:
    >>> pensize()
    1
    >>> pensize(10)   # from here on lines of width 10 are drawn

turtle.window\_height

Help on function window\_height in turtle:

turtle.window\_height = window\_height()
    Return the height of the turtle window.
    
    No argument.
    
    Example (for a TurtleScreen instance named screen):
    >>> screen.window\_height()
    480

turtle.window\_width

Help on function window\_width in turtle:

turtle.window\_width = window\_width()
    Returns the width of the turtle window.
    
    No argument.
    
    Example (for a TurtleScreen instance named screen):
    >>> screen.window\_width()
    640

turtle.write

Help on function write in turtle:

turtle.write = write(arg, move=False, align='left', font=('Arial', 8, 'normal'))
    Write text at the current turtle position.
    
    Arguments:
    arg -- info, which is to be written to the TurtleScreen
    move (optional) -- True/False
    align (optional) -- one of the strings "left", "center" or right"
    font (optional) -- a triple (fontname, fontsize, fonttype)
    
    Write text - the string representation of arg - at the current
    turtle position according to align ("left", "center" or right")
    and with the given font.
    If move is True, the pen is moved to the bottom-right corner
    of the text. By default, move is False.
    
    Example:
    >>> write('Home = ', True, align="center")
    >>> write((0,0), True)

turtle.xcor

Help on function xcor in turtle:

turtle.xcor = xcor()
    Return the turtle's x coordinate.
    
    No arguments.
    
    Example:
    >>> reset()
    >>> left(60)
    >>> forward(100)
    >>> print xcor()
    50.0

turtle.ycor

Help on function ycor in turtle:

turtle.ycor = ycor()
    Return the turtle's y coordinate
    ---
    No arguments.
    
    Example:
    >>> reset()
    >>> left(60)
    >>> forward(100)
    >>> print ycor()
    86.6025403784

[urllib.request](https://trinket.io/docs/python#urllib_request)

urllib.request.read

no Python documentation found for 'urllib.request.read'

urllib.request.readline

no Python documentation found for 'urllib.request.readline'

urllib.request.readlines

no Python documentation found for 'urllib.request.readlines'