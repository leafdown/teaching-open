// Pygame 子集支持 — 纯 Python shim
// 支持: draw / display / event / key / time / image / font / Rect / Surface / mixer.init
export const PYGAME_SHIM = `
import math, time as _time, sys

class Rect:
    def __init__(self,*a):
        if len(a)==4: self.x,self.y,self.w,self.h=a
        elif len(a)==2: self.x,self.y,self.w,self.h=a[0][0],a[0][1],a[1][0],a[1][1]
        else: self.x=self.y=self.w=self.h=0
    @property
    def left(self): return self.x
    @property
    def right(self): return self.x+self.w
    @property
    def top(self): return self.y
    @property
    def bottom(self): return self.y+self.h
    @property
    def center(self): return (self.x+self.w//2,self.y+self.h//2)
    @property
    def size(self): return (self.w,self.h)
    def collidepoint(self,x,y): return self.x<=x<=self.x+self.w and self.y<=y<=self.y+self.h

class Surface:
    def __init__(self,size,flags=0): self._w,self._h=size; self._fill=(0,0,0)
    def get_width(self): return self._w
    def get_height(self): return self._h
    def get_size(self): return (self._w,self._h)
    def fill(self,c): self._fill=c
    def blit(self,s,d,area=None): self._last_blit=(s,d)
    def copy(self): return Surface((self._w,self._h))

class _draw:
    def rect(self,s,c,rect,width=0):
        x,y,w,h=rect if isinstance(rect,(list,tuple)) else (rect.x,rect.y,rect.w,rect.h)
        _canvas_rect(str(c),x,y,w,h,width)
    def circle(self,s,c,center,r,width=0):
        _canvas_circle(str(c),center[0],center[1],r,width)
    def line(self,s,c,start,end,width=1):
        _canvas_line(str(c),start[0],start[1],end[0],end[1],width)
    def polygon(self,s,c,pts,width=0): _canvas_polygon(str(c),pts,width)

class _display:
    _caption=''
    def set_mode(self,size,flags=0,depth=0): return Surface(size)
    def set_caption(self,t): self._caption=t
    def get_caption(self): return self._caption
    def flip(self): _canvas_flip()
    def update(self,r=None): pass

_event_queue=[]
_event_pressed={}
class _event:
    QUIT,KEYDOWN,KEYUP,MOUSEBUTTONDOWN,MOUSEBUTTONUP,MOUSEMOTION=256,768,769,1025,1026,1024
    def __init__(self):
        self.type=None; self.key=None; self.unicode=''
    def get(self):
        q=list(_event_queue); _event_queue.clear()
        return q
    def poll(self):
        return _event_queue.pop(0) if _event_queue else None
    def wait(self):
        while not _event_queue: _time.sleep(0.05)
        return _event_queue.pop(0)
    def post(self,ev): _event_queue.append(ev)

class _key:
    K_UP,K_DOWN,K_LEFT,K_RIGHT=273,274,275,276
    K_SPACE,K_RETURN,K_ESCAPE=32,13,27
    K_a,K_b,K_c,K_d,K_e,K_f,K_g,K_h,K_i,K_j,K_k,K_l,K_m=range(97,110)
    K_n,K_o,K_p,K_q,K_r,K_s,K_t,K_u,K_v,K_w,K_x,K_y,K_z=range(110,123)
    K_0,K_1,K_2,K_3,K_4,K_5,K_6,K_7,K_8,K_9=range(48,58)
    K_LSHIFT, K_RSHIFT=304,303
    K_LCTRL, K_RCTRL=306,305
    K_LALT, K_RALT=308,307
    K_TAB=9
    K_BACKSPACE=8
    K_DELETE=127
    @staticmethod
    def get_pressed(): return _event_pressed

class _mouse:
    @staticmethod
    def get_pos(): return (0,0)
    @staticmethod
    def get_pressed(): return (False, False, False)
    @staticmethod
    def set_pos(pos): pass
    @staticmethod
    def get_focused(): return False
    @staticmethod
    def get_rel(): return (0,0)

class _time:
    def delay(self,ms): _time.sleep(ms/1000)
    def get_ticks(self): return int(_time.time()*1000)
    def set_timer(self,ev,ms): pass

class _font:
    @staticmethod
    def SysFont(name,size,bold=False,italic=False): return _font
    @staticmethod
    def render(text,antialias,color,bg=None):
        print(f"[pygame.font] {text}")
        return Surface((len(text)*10,20))

class _image:
    @staticmethod
    def load(path): return Surface((100,100))
    @staticmethod
    def save(surf,path): pass

class _mixer:
    class Sound:
        def __init__(self,f): pass
        def play(self,loops=0,maxtime=0,fade_ms=0): pass
    class music:
        @staticmethod
        def load(f): pass
        @staticmethod
        def play(loops=0,start=0.0): pass
        @staticmethod
        def stop(): pass
    @staticmethod
    def init(frequency=22050,size=-16,channels=2,buffer=512): pass

class _pygameMod:
    draw=_draw(); display=_display(); event=_event(); key=_key(); time=_time()
    font=_font(); image=_image(); mixer=_mixer(); mouse=_mouse()
    Rect=Rect; Surface=Surface
    QUIT,KEYDOWN,KEYUP=256,768,769
    MOUSEBUTTONDOWN,MOUSEBUTTONUP,MOUSEMOTION=1025,1026,1024
    # 注意: 类体内的 lambda 不接收 self, pygame.init() 会 TypeError — 必须用 staticmethod
    @staticmethod
    def init(): pass
    @staticmethod
    def quit(): pass

sys.modules['pygame']=_pygameMod()
`
