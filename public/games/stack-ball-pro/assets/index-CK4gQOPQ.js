var Bc=Object.defineProperty;var zc=(r,e,t)=>e in r?Bc(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Vo=(r,e,t)=>zc(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const So="160",Hc=0,Wo=1,Gc=2,zl=1,Hl=2,xn=3,On=0,Dt=1,Kt=2,Un=0,Di=1,ao=2,Xo=3,qo=4,kc=5,$n=100,Vc=101,Wc=102,Yo=103,jo=104,Xc=200,qc=201,Yc=202,jc=203,lo=204,co=205,$c=206,Zc=207,Kc=208,Jc=209,Qc=210,eh=211,th=212,nh=213,ih=214,sh=0,rh=1,oh=2,er=3,ah=4,lh=5,ch=6,hh=7,bo=0,uh=1,dh=2,Nn=0,fh=1,ph=2,mh=3,Gl=4,_h=5,gh=6,kl=300,Oi=301,Bi=302,ho=303,uo=304,ur=306,ls=1e3,Jt=1001,fo=1002,Ct=1003,$o=1004,Sr=1005,It=1006,vh=1007,cs=1008,Fn=1009,xh=1010,yh=1011,Eo=1012,Vl=1013,Ln=1014,In=1015,hs=1016,Wl=1017,Xl=1018,Qn=1020,Mh=1021,Qt=1023,Sh=1024,bh=1025,ei=1026,zi=1027,Eh=1028,ql=1029,wh=1030,Yl=1031,jl=1033,br=33776,Er=33777,wr=33778,Tr=33779,Zo=35840,Ko=35841,Jo=35842,Qo=35843,$l=36196,ea=37492,ta=37496,na=37808,ia=37809,sa=37810,ra=37811,oa=37812,aa=37813,la=37814,ca=37815,ha=37816,ua=37817,da=37818,fa=37819,pa=37820,ma=37821,Ar=36492,_a=36494,ga=36495,Th=36283,va=36284,xa=36285,ya=36286,Zl=3e3,ti=3001,Ah=3200,Rh=3201,wo=0,Ch=1,qt="",vt="srgb",bn="srgb-linear",To="display-p3",dr="display-p3-linear",tr="linear",et="srgb",nr="rec709",ir="p3",oi=7680,Ma=519,Ph=512,Lh=513,Ih=514,Kl=515,Dh=516,Uh=517,Nh=518,Fh=519,po=35044,Sa="300 es",mo=1035,Mn=2e3,sr=2001;class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ba=1234567;const ss=Math.PI/180,us=180/Math.PI;function Sn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[r&255]+St[r>>8&255]+St[r>>16&255]+St[r>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function Pt(r,e,t){return Math.max(e,Math.min(t,r))}function Ao(r,e){return(r%e+e)%e}function Oh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Bh(r,e,t){return r!==e?(t-r)/(e-r):0}function rs(r,e,t){return(1-t)*r+t*e}function zh(r,e,t,n){return rs(r,e,1-Math.exp(-t*n))}function Hh(r,e=1){return e-Math.abs(Ao(r,e*2)-e)}function Gh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function kh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Vh(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Wh(r,e){return r+Math.random()*(e-r)}function Xh(r){return r*(.5-Math.random())}function qh(r){r!==void 0&&(ba=r);let e=ba+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yh(r){return r*ss}function jh(r){return r*us}function _o(r){return(r&r-1)===0&&r!==0}function $h(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function rr(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Zh(r,e,t,n,i){const s=Math.cos,a=Math.sin,l=s(t/2),h=a(t/2),u=s((e+n)/2),f=a((e+n)/2),o=s((e-n)/2),c=a((e-n)/2),d=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(l*f,h*o,h*c,l*u);break;case"YZY":r.set(h*c,l*f,h*o,l*u);break;case"ZXZ":r.set(h*o,h*c,l*f,l*u);break;case"XZX":r.set(l*f,h*m,h*d,l*u);break;case"YXY":r.set(h*d,l*f,h*m,l*u);break;case"ZYZ":r.set(h*m,h*d,l*f,l*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function an(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const yn={DEG2RAD:ss,RAD2DEG:us,generateUUID:Sn,clamp:Pt,euclideanModulo:Ao,mapLinear:Oh,inverseLerp:Bh,lerp:rs,damp:zh,pingpong:Hh,smoothstep:Gh,smootherstep:kh,randInt:Vh,randFloat:Wh,randFloatSpread:Xh,seededRandom:qh,degToRad:Yh,radToDeg:jh,isPowerOfTwo:_o,ceilPowerOfTwo:$h,floorPowerOfTwo:rr,setQuaternionFromProperEuler:Zh,normalize:je,denormalize:an};class Ae{constructor(e=0,t=0){Ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,i,s,a,l,h,u){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,l,h,u)}set(e,t,n,i,s,a,l,h,u){const f=this.elements;return f[0]=e,f[1]=i,f[2]=l,f[3]=t,f[4]=s,f[5]=h,f[6]=n,f[7]=a,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],l=n[3],h=n[6],u=n[1],f=n[4],o=n[7],c=n[2],d=n[5],m=n[8],g=i[0],_=i[3],p=i[6],v=i[1],x=i[4],S=i[7],C=i[2],w=i[5],A=i[8];return s[0]=a*g+l*v+h*C,s[3]=a*_+l*x+h*w,s[6]=a*p+l*S+h*A,s[1]=u*g+f*v+o*C,s[4]=u*_+f*x+o*w,s[7]=u*p+f*S+o*A,s[2]=c*g+d*v+m*C,s[5]=c*_+d*x+m*w,s[8]=c*p+d*S+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],l=e[5],h=e[6],u=e[7],f=e[8];return t*a*f-t*l*u-n*s*f+n*l*h+i*s*u-i*a*h}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],l=e[5],h=e[6],u=e[7],f=e[8],o=f*a-l*u,c=l*h-f*s,d=u*s-a*h,m=t*o+n*c+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return e[0]=o*g,e[1]=(i*u-f*n)*g,e[2]=(l*n-i*a)*g,e[3]=c*g,e[4]=(f*t-i*h)*g,e[5]=(i*s-l*t)*g,e[6]=d*g,e[7]=(n*h-u*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,l){const h=Math.cos(s),u=Math.sin(s);return this.set(n*h,n*u,-n*(h*a+u*l)+a+e,-i*u,i*h,-i*(-u*a+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Rr.makeScale(e,t)),this}rotate(e){return this.premultiply(Rr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rr=new ke;function Jl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function or(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Kh(){const r=or("canvas");return r.style.display="block",r}const Ea={};function os(r){r in Ea||(Ea[r]=!0,console.warn(r))}const wa=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ta=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xs={[bn]:{transfer:tr,primaries:nr,toReference:r=>r,fromReference:r=>r},[vt]:{transfer:et,primaries:nr,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[dr]:{transfer:tr,primaries:ir,toReference:r=>r.applyMatrix3(Ta),fromReference:r=>r.applyMatrix3(wa)},[To]:{transfer:et,primaries:ir,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Ta),fromReference:r=>r.applyMatrix3(wa).convertLinearToSRGB()}},Jh=new Set([bn,dr]),$e={enabled:!0,_workingColorSpace:bn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Jh.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=xs[e].toReference,i=xs[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return xs[r].primaries},getTransfer:function(r){return r===qt?tr:xs[r].transfer}};function Ui(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Cr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ai;class Ql{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ai===void 0&&(ai=or("canvas")),ai.width=e.width,ai.height=e.height;const n=ai.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=or("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Ui(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qh=0;class ec{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=Sn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,l=i.length;a<l;a++)i[a].isDataTexture?s.push(Pr(i[a].image)):s.push(Pr(i[a]))}else s=Pr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Pr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ql.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eu=0;class Ut extends Gi{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Jt,i=Jt,s=It,a=cs,l=Qt,h=Fn,u=Ut.DEFAULT_ANISOTROPY,f=qt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=Sn(),this.name="",this.source=new ec(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=h,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof f=="string"?this.colorSpace=f:(os("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=f===ti?vt:qt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ls:e.x=e.x-Math.floor(e.x);break;case Jt:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ls:e.y=e.y-Math.floor(e.y);break;case Jt:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return os("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===vt?ti:Zl}set encoding(e){os("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ti?vt:qt}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=kl;Ut.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,i=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const h=e.elements,u=h[0],f=h[4],o=h[8],c=h[1],d=h[5],m=h[9],g=h[2],_=h[6],p=h[10];if(Math.abs(f-c)<.01&&Math.abs(o-g)<.01&&Math.abs(m-_)<.01){if(Math.abs(f+c)<.1&&Math.abs(o+g)<.1&&Math.abs(m+_)<.1&&Math.abs(u+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(u+1)/2,S=(d+1)/2,C=(p+1)/2,w=(f+c)/4,A=(o+g)/4,O=(m+_)/4;return x>S&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=w/n,s=A/n):S>C?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=w/i,s=O/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=A/s,i=O/s),this.set(n,i,s,t),this}let v=Math.sqrt((_-m)*(_-m)+(o-g)*(o-g)+(c-f)*(c-f));return Math.abs(v)<.001&&(v=1),this.x=(_-m)/v,this.y=(o-g)/v,this.z=(c-f)/v,this.w=Math.acos((u+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tu extends Gi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(os("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ti?vt:qt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ut(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ec(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends tu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class tc extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nu extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let ki=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,l){let h=n[i+0],u=n[i+1],f=n[i+2],o=n[i+3];const c=s[a+0],d=s[a+1],m=s[a+2],g=s[a+3];if(l===0){e[t+0]=h,e[t+1]=u,e[t+2]=f,e[t+3]=o;return}if(l===1){e[t+0]=c,e[t+1]=d,e[t+2]=m,e[t+3]=g;return}if(o!==g||h!==c||u!==d||f!==m){let _=1-l;const p=h*c+u*d+f*m+o*g,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),w=Math.atan2(C,p*v);_=Math.sin(_*w)/C,l=Math.sin(l*w)/C}const S=l*v;if(h=h*_+c*S,u=u*_+d*S,f=f*_+m*S,o=o*_+g*S,_===1-l){const C=1/Math.sqrt(h*h+u*u+f*f+o*o);h*=C,u*=C,f*=C,o*=C}}e[t]=h,e[t+1]=u,e[t+2]=f,e[t+3]=o}static multiplyQuaternionsFlat(e,t,n,i,s,a){const l=n[i],h=n[i+1],u=n[i+2],f=n[i+3],o=s[a],c=s[a+1],d=s[a+2],m=s[a+3];return e[t]=l*m+f*o+h*d-u*c,e[t+1]=h*m+f*c+u*o-l*d,e[t+2]=u*m+f*d+l*c-h*o,e[t+3]=f*m-l*o-h*c-u*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,l=Math.cos,h=Math.sin,u=l(n/2),f=l(i/2),o=l(s/2),c=h(n/2),d=h(i/2),m=h(s/2);switch(a){case"XYZ":this._x=c*f*o+u*d*m,this._y=u*d*o-c*f*m,this._z=u*f*m+c*d*o,this._w=u*f*o-c*d*m;break;case"YXZ":this._x=c*f*o+u*d*m,this._y=u*d*o-c*f*m,this._z=u*f*m-c*d*o,this._w=u*f*o+c*d*m;break;case"ZXY":this._x=c*f*o-u*d*m,this._y=u*d*o+c*f*m,this._z=u*f*m+c*d*o,this._w=u*f*o-c*d*m;break;case"ZYX":this._x=c*f*o-u*d*m,this._y=u*d*o+c*f*m,this._z=u*f*m-c*d*o,this._w=u*f*o+c*d*m;break;case"YZX":this._x=c*f*o+u*d*m,this._y=u*d*o+c*f*m,this._z=u*f*m-c*d*o,this._w=u*f*o-c*d*m;break;case"XZY":this._x=c*f*o-u*d*m,this._y=u*d*o-c*f*m,this._z=u*f*m+c*d*o,this._w=u*f*o+c*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],l=t[5],h=t[9],u=t[2],f=t[6],o=t[10],c=n+l+o;if(c>0){const d=.5/Math.sqrt(c+1);this._w=.25/d,this._x=(f-h)*d,this._y=(s-u)*d,this._z=(a-i)*d}else if(n>l&&n>o){const d=2*Math.sqrt(1+n-l-o);this._w=(f-h)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+u)/d}else if(l>o){const d=2*Math.sqrt(1+l-n-o);this._w=(s-u)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(h+f)/d}else{const d=2*Math.sqrt(1+o-n-l);this._w=(a-i)/d,this._x=(s+u)/d,this._y=(h+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,l=t._x,h=t._y,u=t._z,f=t._w;return this._x=n*f+a*l+i*u-s*h,this._y=i*f+a*h+s*l-n*u,this._z=s*f+a*u+n*h-i*l,this._w=a*f-n*l-i*h-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let l=a*e._w+n*e._x+i*e._y+s*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const h=1-l*l;if(h<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const u=Math.sqrt(h),f=Math.atan2(u,l),o=Math.sin((1-t)*f)/u,c=Math.sin(t*f)/u;return this._w=a*o+this._w*c,this._x=n*o+this._x*c,this._y=i*o+this._y*c,this._z=s*o+this._z*c,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Aa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Aa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,l=e.z,h=e.w,u=2*(a*i-l*n),f=2*(l*t-s*i),o=2*(s*n-a*t);return this.x=t+h*u+a*o-l*f,this.y=n+h*f+l*u-s*o,this.z=i+h*o+s*f-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,l=t.y,h=t.z;return this.x=i*h-s*l,this.y=s*a-n*h,this.z=n*l-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lr.copy(this).projectOnVector(e),this.sub(Lr)}reflect(e){return this.sub(Lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lr=new F,Aa=new ki;class ps{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=s.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(s,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ys.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ys.copy(n.boundingBox)),ys.applyMatrix4(e.matrixWorld),this.union(ys)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xi),Ms.subVectors(this.max,Xi),li.subVectors(e.a,Xi),ci.subVectors(e.b,Xi),hi.subVectors(e.c,Xi),En.subVectors(ci,li),wn.subVectors(hi,ci),Gn.subVectors(li,hi);let t=[0,-En.z,En.y,0,-wn.z,wn.y,0,-Gn.z,Gn.y,En.z,0,-En.x,wn.z,0,-wn.x,Gn.z,0,-Gn.x,-En.y,En.x,0,-wn.y,wn.x,0,-Gn.y,Gn.x,0];return!Ir(t,li,ci,hi,Ms)||(t=[1,0,0,0,1,0,0,0,1],!Ir(t,li,ci,hi,Ms))?!1:(Ss.crossVectors(En,wn),t=[Ss.x,Ss.y,Ss.z],Ir(t,li,ci,hi,Ms))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const cn=[new F,new F,new F,new F,new F,new F,new F,new F],Yt=new F,ys=new ps,li=new F,ci=new F,hi=new F,En=new F,wn=new F,Gn=new F,Xi=new F,Ms=new F,Ss=new F,kn=new F;function Ir(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){kn.fromArray(r,s);const l=i.x*Math.abs(kn.x)+i.y*Math.abs(kn.y)+i.z*Math.abs(kn.z),h=e.dot(kn),u=t.dot(kn),f=n.dot(kn);if(Math.max(-Math.max(h,u,f),Math.min(h,u,f))>l)return!1}return!0}const iu=new ps,qi=new F,Dr=new F;let fr=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):iu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const t=qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(qi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(Dr)),this.expandByPoint(qi.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const hn=new F,Ur=new F,bs=new F,Tn=new F,Nr=new F,Es=new F,Fr=new F;let nc=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ur.copy(e).add(t).multiplyScalar(.5),bs.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub(Ur);const s=e.distanceTo(t)*.5,a=-this.direction.dot(bs),l=Tn.dot(this.direction),h=-Tn.dot(bs),u=Tn.lengthSq(),f=Math.abs(1-a*a);let o,c,d,m;if(f>0)if(o=a*h-l,c=a*l-h,m=s*f,o>=0)if(c>=-m)if(c<=m){const g=1/f;o*=g,c*=g,d=o*(o+a*c+2*l)+c*(a*o+c+2*h)+u}else c=s,o=Math.max(0,-(a*c+l)),d=-o*o+c*(c+2*h)+u;else c=-s,o=Math.max(0,-(a*c+l)),d=-o*o+c*(c+2*h)+u;else c<=-m?(o=Math.max(0,-(-a*s+l)),c=o>0?-s:Math.min(Math.max(-s,-h),s),d=-o*o+c*(c+2*h)+u):c<=m?(o=0,c=Math.min(Math.max(-s,-h),s),d=c*(c+2*h)+u):(o=Math.max(0,-(a*s+l)),c=o>0?s:Math.min(Math.max(-s,-h),s),d=-o*o+c*(c+2*h)+u);else c=a>0?-s:s,o=Math.max(0,-(a*c+l)),d=-o*o+c*(c+2*h)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,o),i&&i.copy(Ur).addScaledVector(bs,c),d}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const n=hn.dot(this.direction),i=hn.dot(hn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),l=n-a,h=n+a;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,l,h;const u=1/this.direction.x,f=1/this.direction.y,o=1/this.direction.z,c=this.origin;return u>=0?(n=(e.min.x-c.x)*u,i=(e.max.x-c.x)*u):(n=(e.max.x-c.x)*u,i=(e.min.x-c.x)*u),f>=0?(s=(e.min.y-c.y)*f,a=(e.max.y-c.y)*f):(s=(e.max.y-c.y)*f,a=(e.min.y-c.y)*f),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),o>=0?(l=(e.min.z-c.z)*o,h=(e.max.z-c.z)*o):(l=(e.max.z-c.z)*o,h=(e.min.z-c.z)*o),n>h||l>i)||((l>n||n!==n)&&(n=l),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,i,s){Nr.subVectors(t,e),Es.subVectors(n,e),Fr.crossVectors(Nr,Es);let a=this.direction.dot(Fr),l;if(a>0){if(i)return null;l=1}else if(a<0)l=-1,a=-a;else return null;Tn.subVectors(this.origin,e);const h=l*this.direction.dot(Es.crossVectors(Tn,Es));if(h<0)return null;const u=l*this.direction.dot(Nr.cross(Tn));if(u<0||h+u>a)return null;const f=-l*Tn.dot(Fr);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ot{constructor(e,t,n,i,s,a,l,h,u,f,o,c,d,m,g,_){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,l,h,u,f,o,c,d,m,g,_)}set(e,t,n,i,s,a,l,h,u,f,o,c,d,m,g,_){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=l,p[13]=h,p[2]=u,p[6]=f,p[10]=o,p[14]=c,p[3]=d,p[7]=m,p[11]=g,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ui.setFromMatrixColumn(e,0).length(),s=1/ui.setFromMatrixColumn(e,1).length(),a=1/ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),l=Math.sin(n),h=Math.cos(i),u=Math.sin(i),f=Math.cos(s),o=Math.sin(s);if(e.order==="XYZ"){const c=a*f,d=a*o,m=l*f,g=l*o;t[0]=h*f,t[4]=-h*o,t[8]=u,t[1]=d+m*u,t[5]=c-g*u,t[9]=-l*h,t[2]=g-c*u,t[6]=m+d*u,t[10]=a*h}else if(e.order==="YXZ"){const c=h*f,d=h*o,m=u*f,g=u*o;t[0]=c+g*l,t[4]=m*l-d,t[8]=a*u,t[1]=a*o,t[5]=a*f,t[9]=-l,t[2]=d*l-m,t[6]=g+c*l,t[10]=a*h}else if(e.order==="ZXY"){const c=h*f,d=h*o,m=u*f,g=u*o;t[0]=c-g*l,t[4]=-a*o,t[8]=m+d*l,t[1]=d+m*l,t[5]=a*f,t[9]=g-c*l,t[2]=-a*u,t[6]=l,t[10]=a*h}else if(e.order==="ZYX"){const c=a*f,d=a*o,m=l*f,g=l*o;t[0]=h*f,t[4]=m*u-d,t[8]=c*u+g,t[1]=h*o,t[5]=g*u+c,t[9]=d*u-m,t[2]=-u,t[6]=l*h,t[10]=a*h}else if(e.order==="YZX"){const c=a*h,d=a*u,m=l*h,g=l*u;t[0]=h*f,t[4]=g-c*o,t[8]=m*o+d,t[1]=o,t[5]=a*f,t[9]=-l*f,t[2]=-u*f,t[6]=d*o+m,t[10]=c-g*o}else if(e.order==="XZY"){const c=a*h,d=a*u,m=l*h,g=l*u;t[0]=h*f,t[4]=-o,t[8]=u*f,t[1]=c*o+g,t[5]=a*f,t[9]=d*o-m,t[2]=m*o-d,t[6]=l*f,t[10]=g*o+c}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(su,e,ru)}lookAt(e,t,n){const i=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),An.crossVectors(n,Ot),An.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),An.crossVectors(n,Ot)),An.normalize(),ws.crossVectors(Ot,An),i[0]=An.x,i[4]=ws.x,i[8]=Ot.x,i[1]=An.y,i[5]=ws.y,i[9]=Ot.y,i[2]=An.z,i[6]=ws.z,i[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],l=n[4],h=n[8],u=n[12],f=n[1],o=n[5],c=n[9],d=n[13],m=n[2],g=n[6],_=n[10],p=n[14],v=n[3],x=n[7],S=n[11],C=n[15],w=i[0],A=i[4],O=i[8],M=i[12],E=i[1],U=i[5],z=i[9],N=i[13],P=i[2],L=i[6],I=i[10],j=i[14],H=i[3],G=i[7],K=i[11],Z=i[15];return s[0]=a*w+l*E+h*P+u*H,s[4]=a*A+l*U+h*L+u*G,s[8]=a*O+l*z+h*I+u*K,s[12]=a*M+l*N+h*j+u*Z,s[1]=f*w+o*E+c*P+d*H,s[5]=f*A+o*U+c*L+d*G,s[9]=f*O+o*z+c*I+d*K,s[13]=f*M+o*N+c*j+d*Z,s[2]=m*w+g*E+_*P+p*H,s[6]=m*A+g*U+_*L+p*G,s[10]=m*O+g*z+_*I+p*K,s[14]=m*M+g*N+_*j+p*Z,s[3]=v*w+x*E+S*P+C*H,s[7]=v*A+x*U+S*L+C*G,s[11]=v*O+x*z+S*I+C*K,s[15]=v*M+x*N+S*j+C*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],l=e[5],h=e[9],u=e[13],f=e[2],o=e[6],c=e[10],d=e[14],m=e[3],g=e[7],_=e[11],p=e[15];return m*(+s*h*o-i*u*o-s*l*c+n*u*c+i*l*d-n*h*d)+g*(+t*h*d-t*u*c+s*a*c-i*a*d+i*u*f-s*h*f)+_*(+t*u*o-t*l*d-s*a*o+n*a*d+s*l*f-n*u*f)+p*(-i*l*f-t*h*o+t*l*c+i*a*o-n*a*c+n*h*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],l=e[5],h=e[6],u=e[7],f=e[8],o=e[9],c=e[10],d=e[11],m=e[12],g=e[13],_=e[14],p=e[15],v=o*_*u-g*c*u+g*h*d-l*_*d-o*h*p+l*c*p,x=m*c*u-f*_*u-m*h*d+a*_*d+f*h*p-a*c*p,S=f*g*u-m*o*u+m*l*d-a*g*d-f*l*p+a*o*p,C=m*o*h-f*g*h-m*l*c+a*g*c+f*l*_-a*o*_,w=t*v+n*x+i*S+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=v*A,e[1]=(g*c*s-o*_*s-g*i*d+n*_*d+o*i*p-n*c*p)*A,e[2]=(l*_*s-g*h*s+g*i*u-n*_*u-l*i*p+n*h*p)*A,e[3]=(o*h*s-l*c*s-o*i*u+n*c*u+l*i*d-n*h*d)*A,e[4]=x*A,e[5]=(f*_*s-m*c*s+m*i*d-t*_*d-f*i*p+t*c*p)*A,e[6]=(m*h*s-a*_*s-m*i*u+t*_*u+a*i*p-t*h*p)*A,e[7]=(a*c*s-f*h*s+f*i*u-t*c*u-a*i*d+t*h*d)*A,e[8]=S*A,e[9]=(m*o*s-f*g*s-m*n*d+t*g*d+f*n*p-t*o*p)*A,e[10]=(a*g*s-m*l*s+m*n*u-t*g*u-a*n*p+t*l*p)*A,e[11]=(f*l*s-a*o*s-f*n*u+t*o*u+a*n*d-t*l*d)*A,e[12]=C*A,e[13]=(f*g*i-m*o*i+m*n*c-t*g*c-f*n*_+t*o*_)*A,e[14]=(m*l*i-a*g*i-m*n*h+t*g*h+a*n*_-t*l*_)*A,e[15]=(a*o*i-f*l*i+f*n*h-t*o*h-a*n*c+t*l*c)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,l=e.y,h=e.z,u=s*a,f=s*l;return this.set(u*a+n,u*l-i*h,u*h+i*l,0,u*l+i*h,f*l+n,f*h-i*a,0,u*h-i*l,f*h+i*a,s*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,l=t._z,h=t._w,u=s+s,f=a+a,o=l+l,c=s*u,d=s*f,m=s*o,g=a*f,_=a*o,p=l*o,v=h*u,x=h*f,S=h*o,C=n.x,w=n.y,A=n.z;return i[0]=(1-(g+p))*C,i[1]=(d+S)*C,i[2]=(m-x)*C,i[3]=0,i[4]=(d-S)*w,i[5]=(1-(c+p))*w,i[6]=(_+v)*w,i[7]=0,i[8]=(m+x)*A,i[9]=(_-v)*A,i[10]=(1-(c+g))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ui.set(i[0],i[1],i[2]).length();const a=ui.set(i[4],i[5],i[6]).length(),l=ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],jt.copy(this);const u=1/s,f=1/a,o=1/l;return jt.elements[0]*=u,jt.elements[1]*=u,jt.elements[2]*=u,jt.elements[4]*=f,jt.elements[5]*=f,jt.elements[6]*=f,jt.elements[8]*=o,jt.elements[9]*=o,jt.elements[10]*=o,t.setFromRotationMatrix(jt),n.x=s,n.y=a,n.z=l,this}makePerspective(e,t,n,i,s,a,l=Mn){const h=this.elements,u=2*s/(t-e),f=2*s/(n-i),o=(t+e)/(t-e),c=(n+i)/(n-i);let d,m;if(l===Mn)d=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(l===sr)d=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=u,h[4]=0,h[8]=o,h[12]=0,h[1]=0,h[5]=f,h[9]=c,h[13]=0,h[2]=0,h[6]=0,h[10]=d,h[14]=m,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,i,s,a,l=Mn){const h=this.elements,u=1/(t-e),f=1/(n-i),o=1/(a-s),c=(t+e)*u,d=(n+i)*f;let m,g;if(l===Mn)m=(a+s)*o,g=-2*o;else if(l===sr)m=s*o,g=-1*o;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*u,h[4]=0,h[8]=0,h[12]=-c,h[1]=0,h[5]=2*f,h[9]=0,h[13]=-d,h[2]=0,h[6]=0,h[10]=g,h[14]=-m,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ui=new F,jt=new ot,su=new F(0,0,0),ru=new F(1,1,1),An=new F,ws=new F,Ot=new F,Ra=new ot,Ca=new ki;class pr{constructor(e=0,t=0,n=0,i=pr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],l=i[8],h=i[1],u=i[5],f=i[9],o=i[2],c=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(c,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(l,d),this._z=Math.atan2(h,u)):(this._y=Math.atan2(-o,s),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-o,d),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,d),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(Pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-o,s)):(this._x=0,this._y=Math.atan2(l,d));break;case"XZY":this._z=Math.asin(-Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(c,u),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-f,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ra.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ra,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ca.setFromEuler(this),this.setFromQuaternion(Ca,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pr.DEFAULT_ORDER="XYZ";class ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ou=0;const Pa=new F,di=new ki,un=new ot,Ts=new F,Yi=new F,au=new F,lu=new ki,La=new F(1,0,0),Ia=new F(0,1,0),Da=new F(0,0,1),cu={type:"added"},hu={type:"removed"};class dt extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new F,t=new pr,n=new ki,i=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ot},normalMatrix:{value:new ke}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.multiply(di),this}rotateOnWorldAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.premultiply(di),this}rotateX(e){return this.rotateOnAxis(La,e)}rotateY(e){return this.rotateOnAxis(Ia,e)}rotateZ(e){return this.rotateOnAxis(Da,e)}translateOnAxis(e,t){return Pa.copy(e).applyQuaternion(this.quaternion),this.position.add(Pa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(La,e)}translateY(e){return this.translateOnAxis(Ia,e)}translateZ(e){return this.translateOnAxis(Da,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ts.copy(e):Ts.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(Yi,Ts,this.up):un.lookAt(Ts,Yi,this.up),this.quaternion.setFromRotationMatrix(un),i&&(un.extractRotation(i.matrixWorld),di.setFromRotationMatrix(un),this.quaternion.premultiply(di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(cu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,au),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,lu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++){const l=i[s];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let u=0,f=h.length;u<f;u++){const o=h[u];s(e.shapes,o)}else s(e.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,u=this.material.length;h<u;h++)l.push(s(e.materials,this.material[h]));i.material=l}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let l=0;l<this.children.length;l++)i.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];i.animations.push(s(e.animations,h))}}if(t){const l=a(e.geometries),h=a(e.materials),u=a(e.textures),f=a(e.images),o=a(e.shapes),c=a(e.skeletons),d=a(e.animations),m=a(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),u.length>0&&(n.textures=u),f.length>0&&(n.images=f),o.length>0&&(n.shapes=o),c.length>0&&(n.skeletons=c),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(l){const h=[];for(const u in l){const f=l[u];delete f.metadata,h.push(f)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}dt.DEFAULT_UP=new F(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $t=new F,dn=new F,Or=new F,fn=new F,fi=new F,pi=new F,Ua=new F,Br=new F,zr=new F,Hr=new F;let As=!1;class Wt{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),$t.subVectors(e,t),i.cross($t);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){$t.subVectors(i,t),dn.subVectors(n,t),Or.subVectors(e,t);const a=$t.dot($t),l=$t.dot(dn),h=$t.dot(Or),u=dn.dot(dn),f=dn.dot(Or),o=a*u-l*l;if(o===0)return s.set(0,0,0),null;const c=1/o,d=(u*h-l*f)*c,m=(a*f-l*h)*c;return s.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getUV(e,t,n,i,s,a,l,h){return As===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),As=!0),this.getInterpolation(e,t,n,i,s,a,l,h)}static getInterpolation(e,t,n,i,s,a,l,h){return this.getBarycoord(e,t,n,i,fn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(s,fn.x),h.addScaledVector(a,fn.y),h.addScaledVector(l,fn.z),h)}static isFrontFacing(e,t,n,i){return $t.subVectors(n,t),dn.subVectors(e,t),$t.cross(dn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),$t.cross(dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return As===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),As=!0),Wt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return Wt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Wt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,l;fi.subVectors(i,n),pi.subVectors(s,n),Br.subVectors(e,n);const h=fi.dot(Br),u=pi.dot(Br);if(h<=0&&u<=0)return t.copy(n);zr.subVectors(e,i);const f=fi.dot(zr),o=pi.dot(zr);if(f>=0&&o<=f)return t.copy(i);const c=h*o-f*u;if(c<=0&&h>=0&&f<=0)return a=h/(h-f),t.copy(n).addScaledVector(fi,a);Hr.subVectors(e,s);const d=fi.dot(Hr),m=pi.dot(Hr);if(m>=0&&d<=m)return t.copy(s);const g=d*u-h*m;if(g<=0&&u>=0&&m<=0)return l=u/(u-m),t.copy(n).addScaledVector(pi,l);const _=f*m-d*o;if(_<=0&&o-f>=0&&d-m>=0)return Ua.subVectors(s,i),l=(o-f)/(o-f+(d-m)),t.copy(i).addScaledVector(Ua,l);const p=1/(_+g+c);return a=g*p,l=c*p,t.copy(n).addScaledVector(fi,a).addScaledVector(pi,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const sc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function Gr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Le{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=Ao(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Gr(a,s,e+1/3),this.g=Gr(a,s,e),this.b=Gr(a,s,e-1/3)}return $e.toWorkingColorSpace(this,i),this}setStyle(e,t=vt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],l=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){const n=sc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return $e.fromWorkingColorSpace(bt.copy(this),e),Math.round(Pt(bt.r*255,0,255))*65536+Math.round(Pt(bt.g*255,0,255))*256+Math.round(Pt(bt.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(bt.copy(this),t);const n=bt.r,i=bt.g,s=bt.b,a=Math.max(n,i,s),l=Math.min(n,i,s);let h,u;const f=(l+a)/2;if(l===a)h=0,u=0;else{const o=a-l;switch(u=f<=.5?o/(a+l):o/(2-a-l),a){case n:h=(i-s)/o+(i<s?6:0);break;case i:h=(s-n)/o+2;break;case s:h=(n-i)/o+4;break}h/=6}return e.h=h,e.s=u,e.l=f,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=vt){$e.fromWorkingColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,i=bt.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(Rs);const n=rs(Rn.h,Rs.h,t),i=rs(Rn.s,Rs.s,t),s=rs(Rn.l,Rs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Le;Le.NAMES=sc;let uu=0,Bn=class extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=Di,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lo,this.blendDst=co,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lo&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==$n&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==er&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const l in s){const h=s[l];delete h.metadata,a.push(h)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};class ds extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new F,Cs=new Ae;class Ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=po,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cs.fromBufferAttribute(this,t),Cs.applyMatrix3(e),this.setXY(t,Cs.x,Cs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array),s=je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==po&&(e.usage=this.usage),e}}class rc extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class oc extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class yt extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let du=0;const Vt=new ot,kr=new dt,mi=new F,Bt=new ps,ji=new ps,gt=new F;class Nt extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jl(e)?oc:rc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return kr.lookAt(e),kr.updateMatrix(),this.applyMatrix4(kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new yt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ps);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const l=t[s];ji.setFromBufferAttribute(l),this.morphTargetsRelative?(gt.addVectors(Bt.min,ji.min),Bt.expandByPoint(gt),gt.addVectors(Bt.max,ji.max),Bt.expandByPoint(gt)):(Bt.expandByPoint(ji.min),Bt.expandByPoint(ji.max))}Bt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)gt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let s=0,a=t.length;s<a;s++){const l=t[s],h=this.morphTargetsRelative;for(let u=0,f=l.count;u<f;u++)gt.fromBufferAttribute(l,u),h&&(mi.fromBufferAttribute(e,u),gt.add(mi)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,a=t.uv.array,l=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*l),4));const h=this.getAttribute("tangent").array,u=[],f=[];for(let E=0;E<l;E++)u[E]=new F,f[E]=new F;const o=new F,c=new F,d=new F,m=new Ae,g=new Ae,_=new Ae,p=new F,v=new F;function x(E,U,z){o.fromArray(i,E*3),c.fromArray(i,U*3),d.fromArray(i,z*3),m.fromArray(a,E*2),g.fromArray(a,U*2),_.fromArray(a,z*2),c.sub(o),d.sub(o),g.sub(m),_.sub(m);const N=1/(g.x*_.y-_.x*g.y);isFinite(N)&&(p.copy(c).multiplyScalar(_.y).addScaledVector(d,-g.y).multiplyScalar(N),v.copy(d).multiplyScalar(g.x).addScaledVector(c,-_.x).multiplyScalar(N),u[E].add(p),u[U].add(p),u[z].add(p),f[E].add(v),f[U].add(v),f[z].add(v))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let E=0,U=S.length;E<U;++E){const z=S[E],N=z.start,P=z.count;for(let L=N,I=N+P;L<I;L+=3)x(n[L+0],n[L+1],n[L+2])}const C=new F,w=new F,A=new F,O=new F;function M(E){A.fromArray(s,E*3),O.copy(A);const U=u[E];C.copy(U),C.sub(A.multiplyScalar(A.dot(U))).normalize(),w.crossVectors(O,U);const N=w.dot(f[E])<0?-1:1;h[E*4]=C.x,h[E*4+1]=C.y,h[E*4+2]=C.z,h[E*4+3]=N}for(let E=0,U=S.length;E<U;++E){const z=S[E],N=z.start,P=z.count;for(let L=N,I=N+P;L<I;L+=3)M(n[L+0]),M(n[L+1]),M(n[L+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let c=0,d=n.count;c<d;c++)n.setXYZ(c,0,0,0);const i=new F,s=new F,a=new F,l=new F,h=new F,u=new F,f=new F,o=new F;if(e)for(let c=0,d=e.count;c<d;c+=3){const m=e.getX(c+0),g=e.getX(c+1),_=e.getX(c+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),f.subVectors(a,s),o.subVectors(i,s),f.cross(o),l.fromBufferAttribute(n,m),h.fromBufferAttribute(n,g),u.fromBufferAttribute(n,_),l.add(f),h.add(f),u.add(f),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(g,h.x,h.y,h.z),n.setXYZ(_,u.x,u.y,u.z)}else for(let c=0,d=t.count;c<d;c+=3)i.fromBufferAttribute(t,c+0),s.fromBufferAttribute(t,c+1),a.fromBufferAttribute(t,c+2),f.subVectors(a,s),o.subVectors(i,s),f.cross(o),n.setXYZ(c+0,f.x,f.y,f.z),n.setXYZ(c+1,f.x,f.y,f.z),n.setXYZ(c+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(l,h){const u=l.array,f=l.itemSize,o=l.normalized,c=new u.constructor(h.length*f);let d=0,m=0;for(let g=0,_=h.length;g<_;g++){l.isInterleavedBufferAttribute?d=h[g]*l.data.stride+l.offset:d=h[g]*f;for(let p=0;p<f;p++)c[m++]=u[d++]}return new Ht(c,f,o)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,i=this.attributes;for(const l in i){const h=i[l],u=e(h,n);t.setAttribute(l,u)}const s=this.morphAttributes;for(const l in s){const h=[],u=s[l];for(let f=0,o=u.length;f<o;f++){const c=u[f],d=e(c,n);h.push(d)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const u in h)h[u]!==void 0&&(e[u]=h[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const u=n[h];e.data.attributes[h]=u.toJSON(e.data)}const i={};let s=!1;for(const h in this.morphAttributes){const u=this.morphAttributes[h],f=[];for(let o=0,c=u.length;o<c;o++){const d=u[o];f.push(d.toJSON(e.data))}f.length>0&&(i[h]=f,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const u in i){const f=i[u];this.setAttribute(u,f.clone(t))}const s=e.morphAttributes;for(const u in s){const f=[],o=s[u];for(let c=0,d=o.length;c<d;c++)f.push(o[c].clone(t));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,f=a.length;u<f;u++){const o=a[u];this.addGroup(o.start,o.count,o.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Na=new ot,Vn=new nc,Ps=new fr,Fa=new F,_i=new F,gi=new F,vi=new F,Vr=new F,Ls=new F,Is=new Ae,Ds=new Ae,Us=new Ae,Oa=new F,Ba=new F,za=new F,Ns=new F,Fs=new F;class xt extends dt{constructor(e=new Nt,t=new ds){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const l=this.morphTargetInfluences;if(s&&l){Ls.set(0,0,0);for(let h=0,u=s.length;h<u;h++){const f=l[h],o=s[h];f!==0&&(Vr.fromBufferAttribute(o,e),a?Ls.addScaledVector(Vr,f):Ls.addScaledVector(Vr.sub(t),f))}t.add(Ls)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(s),Vn.copy(e.ray).recast(e.near),!(Ps.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(Ps,Fa)===null||Vn.origin.distanceToSquared(Fa)>(e.far-e.near)**2))&&(Na.copy(s).invert(),Vn.copy(e.ray).applyMatrix4(Na),!(n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,l=s.index,h=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,o=s.attributes.normal,c=s.groups,d=s.drawRange;if(l!==null)if(Array.isArray(a))for(let m=0,g=c.length;m<g;m++){const _=c[m],p=a[_.materialIndex],v=Math.max(_.start,d.start),x=Math.min(l.count,Math.min(_.start+_.count,d.start+d.count));for(let S=v,C=x;S<C;S+=3){const w=l.getX(S),A=l.getX(S+1),O=l.getX(S+2);i=Os(this,p,e,n,u,f,o,w,A,O),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=_.materialIndex,t.push(i))}}else{const m=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let _=m,p=g;_<p;_+=3){const v=l.getX(_),x=l.getX(_+1),S=l.getX(_+2);i=Os(this,a,e,n,u,f,o,v,x,S),i&&(i.faceIndex=Math.floor(_/3),t.push(i))}}else if(h!==void 0)if(Array.isArray(a))for(let m=0,g=c.length;m<g;m++){const _=c[m],p=a[_.materialIndex],v=Math.max(_.start,d.start),x=Math.min(h.count,Math.min(_.start+_.count,d.start+d.count));for(let S=v,C=x;S<C;S+=3){const w=S,A=S+1,O=S+2;i=Os(this,p,e,n,u,f,o,w,A,O),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=_.materialIndex,t.push(i))}}else{const m=Math.max(0,d.start),g=Math.min(h.count,d.start+d.count);for(let _=m,p=g;_<p;_+=3){const v=_,x=_+1,S=_+2;i=Os(this,a,e,n,u,f,o,v,x,S),i&&(i.faceIndex=Math.floor(_/3),t.push(i))}}}}function fu(r,e,t,n,i,s,a,l){let h;if(e.side===Dt?h=n.intersectTriangle(a,s,i,!0,l):h=n.intersectTriangle(i,s,a,e.side===On,l),h===null)return null;Fs.copy(l),Fs.applyMatrix4(r.matrixWorld);const u=t.ray.origin.distanceTo(Fs);return u<t.near||u>t.far?null:{distance:u,point:Fs.clone(),object:r}}function Os(r,e,t,n,i,s,a,l,h,u){r.getVertexPosition(l,_i),r.getVertexPosition(h,gi),r.getVertexPosition(u,vi);const f=fu(r,e,t,n,_i,gi,vi,Ns);if(f){i&&(Is.fromBufferAttribute(i,l),Ds.fromBufferAttribute(i,h),Us.fromBufferAttribute(i,u),f.uv=Wt.getInterpolation(Ns,_i,gi,vi,Is,Ds,Us,new Ae)),s&&(Is.fromBufferAttribute(s,l),Ds.fromBufferAttribute(s,h),Us.fromBufferAttribute(s,u),f.uv1=Wt.getInterpolation(Ns,_i,gi,vi,Is,Ds,Us,new Ae),f.uv2=f.uv1),a&&(Oa.fromBufferAttribute(a,l),Ba.fromBufferAttribute(a,h),za.fromBufferAttribute(a,u),f.normal=Wt.getInterpolation(Ns,_i,gi,vi,Oa,Ba,za,new F),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const o={a:l,b:h,c:u,normal:new F,materialIndex:0};Wt.getNormal(_i,gi,vi,o.normal),f.face=o}return f}class ri extends Nt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const l=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const h=[],u=[],f=[],o=[];let c=0,d=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(h),this.setAttribute("position",new yt(u,3)),this.setAttribute("normal",new yt(f,3)),this.setAttribute("uv",new yt(o,2));function m(g,_,p,v,x,S,C,w,A,O,M){const E=S/A,U=C/O,z=S/2,N=C/2,P=w/2,L=A+1,I=O+1;let j=0,H=0;const G=new F;for(let K=0;K<I;K++){const Z=K*U-N;for(let $=0;$<L;$++){const Y=$*E-z;G[g]=Y*v,G[_]=Z*x,G[p]=P,u.push(G.x,G.y,G.z),G[g]=0,G[_]=0,G[p]=w>0?1:-1,f.push(G.x,G.y,G.z),o.push($/A),o.push(1-K/O),j+=1}}for(let K=0;K<O;K++)for(let Z=0;Z<A;Z++){const $=c+Z+L*K,Y=c+Z+L*(K+1),J=c+(Z+1)+L*(K+1),ae=c+(Z+1)+L*K;h.push($,Y,ae),h.push(Y,J,ae),H+=6}l.addGroup(d,H,M),d+=H,c+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Rt(r){const e={};for(let t=0;t<r.length;t++){const n=Hi(r[t]);for(const i in n)e[i]=n[i]}return e}function pu(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ac(r){return r.getRenderTarget()===null?r.outputColorSpace:$e.workingColorSpace}const mu={clone:Hi,merge:Rt};var _u=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class si extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_u,this.fragmentShader=gu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=pu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class lc extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Mn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class zt extends lc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return us*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ss*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,u=a.fullHeight;s+=a.offsetX*i/h,t-=a.offsetY*n/u,i*=a.width/h,n*=a.height/u}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const xi=-90,yi=1;class vu extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new zt(xi,yi,e,t);i.layers=this.layers,this.add(i);const s=new zt(xi,yi,e,t);s.layers=this.layers,this.add(s);const a=new zt(xi,yi,e,t);a.layers=this.layers,this.add(a);const l=new zt(xi,yi,e,t);l.layers=this.layers,this.add(l);const h=new zt(xi,yi,e,t);h.layers=this.layers,this.add(h);const u=new zt(xi,yi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,l,h]=t;for(const u of t)this.remove(u);if(e===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,l,h,u,f]=this.children,o=e.getRenderTarget(),c=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,l),e.setRenderTarget(n,3,i),e.render(t,h),e.setRenderTarget(n,4,i),e.render(t,u),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,f),e.setRenderTarget(o,c,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class cc extends Ut{constructor(e,t,n,i,s,a,l,h,u,f){e=e!==void 0?e:[],t=t!==void 0?t:Oi,super(e,t,n,i,s,a,l,h,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xu extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(os("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ti?vt:qt),this.texture=new cc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:It}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ri(5,5,5),s=new si({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:Un});s.uniforms.tEquirect.value=t;const a=new xt(i,s),l=t.minFilter;return t.minFilter===cs&&(t.minFilter=It),new vu(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const Wr=new F,yu=new F,Mu=new ke;class Yn{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Wr.subVectors(n,t).cross(yu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Wr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mu.getNormalMatrix(e),i=this.coplanarPoint(Wr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new fr,Bs=new F;class Ro{constructor(e=new Yn,t=new Yn,n=new Yn,i=new Yn,s=new Yn,a=new Yn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(i),l[4].copy(s),l[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn){const n=this.planes,i=e.elements,s=i[0],a=i[1],l=i[2],h=i[3],u=i[4],f=i[5],o=i[6],c=i[7],d=i[8],m=i[9],g=i[10],_=i[11],p=i[12],v=i[13],x=i[14],S=i[15];if(n[0].setComponents(h-s,c-u,_-d,S-p).normalize(),n[1].setComponents(h+s,c+u,_+d,S+p).normalize(),n[2].setComponents(h+a,c+f,_+m,S+v).normalize(),n[3].setComponents(h-a,c-f,_-m,S-v).normalize(),n[4].setComponents(h-l,c-o,_-g,S-x).normalize(),t===Mn)n[5].setComponents(h+l,c+o,_+g,S+x).normalize();else if(t===sr)n[5].setComponents(l,o,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(e){return Wn.center.set(0,0,0),Wn.radius=.7071067811865476,Wn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Bs.x=i.normal.x>0?e.max.x:e.min.x,Bs.y=i.normal.y>0?e.max.y:e.min.y,Bs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hc(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Su(r,e){const t=e.isWebGL2,n=new WeakMap;function i(u,f){const o=u.array,c=u.usage,d=o.byteLength,m=r.createBuffer();r.bindBuffer(f,m),r.bufferData(f,o,c),u.onUploadCallback();let g;if(o instanceof Float32Array)g=r.FLOAT;else if(o instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(o instanceof Int16Array)g=r.SHORT;else if(o instanceof Uint32Array)g=r.UNSIGNED_INT;else if(o instanceof Int32Array)g=r.INT;else if(o instanceof Int8Array)g=r.BYTE;else if(o instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(o instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);return{buffer:m,type:g,bytesPerElement:o.BYTES_PER_ELEMENT,version:u.version,size:d}}function s(u,f,o){const c=f.array,d=f._updateRange,m=f.updateRanges;if(r.bindBuffer(o,u),d.count===-1&&m.length===0&&r.bufferSubData(o,0,c),m.length!==0){for(let g=0,_=m.length;g<_;g++){const p=m[g];t?r.bufferSubData(o,p.start*c.BYTES_PER_ELEMENT,c,p.start,p.count):r.bufferSubData(o,p.start*c.BYTES_PER_ELEMENT,c.subarray(p.start,p.start+p.count))}f.clearUpdateRanges()}d.count!==-1&&(t?r.bufferSubData(o,d.offset*c.BYTES_PER_ELEMENT,c,d.offset,d.count):r.bufferSubData(o,d.offset*c.BYTES_PER_ELEMENT,c.subarray(d.offset,d.offset+d.count)),d.count=-1),f.onUploadCallback()}function a(u){return u.isInterleavedBufferAttribute&&(u=u.data),n.get(u)}function l(u){u.isInterleavedBufferAttribute&&(u=u.data);const f=n.get(u);f&&(r.deleteBuffer(f.buffer),n.delete(u))}function h(u,f){if(u.isGLBufferAttribute){const c=n.get(u);(!c||c.version<u.version)&&n.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const o=n.get(u);if(o===void 0)n.set(u,i(u,f));else if(o.version<u.version){if(o.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(o.buffer,u,f),o.version=u.version}}return{get:a,remove:l,update:h}}class Co extends Nt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,l=Math.floor(n),h=Math.floor(i),u=l+1,f=h+1,o=e/l,c=t/h,d=[],m=[],g=[],_=[];for(let p=0;p<f;p++){const v=p*c-a;for(let x=0;x<u;x++){const S=x*o-s;m.push(S,-v,0),g.push(0,0,1),_.push(x/l),_.push(1-p/h)}}for(let p=0;p<h;p++)for(let v=0;v<l;v++){const x=v+u*p,S=v+u*(p+1),C=v+1+u*(p+1),w=v+1+u*p;d.push(x,S,w),d.push(S,C,w)}this.setIndex(d),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(g,3)),this.setAttribute("uv",new yt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.width,e.height,e.widthSegments,e.heightSegments)}}var bu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Iu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Du=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ou=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Xu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,qu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ju=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",ed=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,id=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ud=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_d=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Md=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ud=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Hd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_f=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ef=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Lf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,If=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Uf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:bu,alphahash_pars_fragment:Eu,alphamap_fragment:wu,alphamap_pars_fragment:Tu,alphatest_fragment:Au,alphatest_pars_fragment:Ru,aomap_fragment:Cu,aomap_pars_fragment:Pu,batching_pars_vertex:Lu,batching_vertex:Iu,begin_vertex:Du,beginnormal_vertex:Uu,bsdfs:Nu,iridescence_fragment:Fu,bumpmap_pars_fragment:Ou,clipping_planes_fragment:Bu,clipping_planes_pars_fragment:zu,clipping_planes_pars_vertex:Hu,clipping_planes_vertex:Gu,color_fragment:ku,color_pars_fragment:Vu,color_pars_vertex:Wu,color_vertex:Xu,common:qu,cube_uv_reflection_fragment:Yu,defaultnormal_vertex:ju,displacementmap_pars_vertex:$u,displacementmap_vertex:Zu,emissivemap_fragment:Ku,emissivemap_pars_fragment:Ju,colorspace_fragment:Qu,colorspace_pars_fragment:ed,envmap_fragment:td,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:sd,envmap_physical_pars_fragment:_d,envmap_vertex:rd,fog_vertex:od,fog_pars_vertex:ad,fog_fragment:ld,fog_pars_fragment:cd,gradientmap_pars_fragment:hd,lightmap_fragment:ud,lightmap_pars_fragment:dd,lights_lambert_fragment:fd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:gd,lights_toon_pars_fragment:vd,lights_phong_fragment:xd,lights_phong_pars_fragment:yd,lights_physical_fragment:Md,lights_physical_pars_fragment:Sd,lights_fragment_begin:bd,lights_fragment_maps:Ed,lights_fragment_end:wd,logdepthbuf_fragment:Td,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Cd,map_fragment:Pd,map_pars_fragment:Ld,map_particle_fragment:Id,map_particle_pars_fragment:Dd,metalnessmap_fragment:Ud,metalnessmap_pars_fragment:Nd,morphcolor_vertex:Fd,morphnormal_vertex:Od,morphtarget_pars_vertex:Bd,morphtarget_vertex:zd,normal_fragment_begin:Hd,normal_fragment_maps:Gd,normal_pars_fragment:kd,normal_pars_vertex:Vd,normal_vertex:Wd,normalmap_pars_fragment:Xd,clearcoat_normal_fragment_begin:qd,clearcoat_normal_fragment_maps:Yd,clearcoat_pars_fragment:jd,iridescence_pars_fragment:$d,opaque_fragment:Zd,packing:Kd,premultiplied_alpha_fragment:Jd,project_vertex:Qd,dithering_fragment:ef,dithering_pars_fragment:tf,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:of,shadowmap_vertex:af,shadowmask_pars_fragment:lf,skinbase_vertex:cf,skinning_pars_vertex:hf,skinning_vertex:uf,skinnormal_vertex:df,specularmap_fragment:ff,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:_f,transmission_fragment:gf,transmission_pars_fragment:vf,uv_pars_fragment:xf,uv_pars_vertex:yf,uv_vertex:Mf,worldpos_vertex:Sf,background_vert:bf,background_frag:Ef,backgroundCube_vert:wf,backgroundCube_frag:Tf,cube_vert:Af,cube_frag:Rf,depth_vert:Cf,depth_frag:Pf,distanceRGBA_vert:Lf,distanceRGBA_frag:If,equirect_vert:Df,equirect_frag:Uf,linedashed_vert:Nf,linedashed_frag:Ff,meshbasic_vert:Of,meshbasic_frag:Bf,meshlambert_vert:zf,meshlambert_frag:Hf,meshmatcap_vert:Gf,meshmatcap_frag:kf,meshnormal_vert:Vf,meshnormal_frag:Wf,meshphong_vert:Xf,meshphong_frag:qf,meshphysical_vert:Yf,meshphysical_frag:jf,meshtoon_vert:$f,meshtoon_frag:Zf,points_vert:Kf,points_frag:Jf,shadow_vert:Qf,shadow_frag:ep,sprite_vert:tp,sprite_frag:np},se={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},on={basic:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Le(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Rt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Rt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Le(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Rt([se.points,se.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Rt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Rt([se.common,se.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Rt([se.sprite,se.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Rt([se.common,se.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Rt([se.lights,se.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};on.physical={uniforms:Rt([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const zs={r:0,b:0,g:0};function ip(r,e,t,n,i,s,a){const l=new Le(0);let h=s===!0?0:1,u,f,o=null,c=0,d=null;function m(_,p){let v=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?g(l,h):x&&x.isColor&&(g(x,1),v=!0);const S=r.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ur)?(f===void 0&&(f=new xt(new ri(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:Hi(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(f)),f.material.uniforms.envMap.value=x,f.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,f.material.toneMapped=$e.getTransfer(x.colorSpace)!==et,(o!==x||c!==x.version||d!==r.toneMapping)&&(f.material.needsUpdate=!0,o=x,c=x.version,d=r.toneMapping),f.layers.enableAll(),_.unshift(f,f.geometry,f.material,0,0,null)):x&&x.isTexture&&(u===void 0&&(u=new xt(new Co(2,2),new si({name:"BackgroundMaterial",uniforms:Hi(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=x,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=$e.getTransfer(x.colorSpace)!==et,x.matrixAutoUpdate===!0&&x.updateMatrix(),u.material.uniforms.uvTransform.value.copy(x.matrix),(o!==x||c!==x.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,o=x,c=x.version,d=r.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null))}function g(_,p){_.getRGB(zs,ac(r)),n.buffers.color.setClear(zs.r,zs.g,zs.b,p,a)}return{getClearColor:function(){return l},setClearColor:function(_,p=1){l.set(_),h=p,g(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(_){h=_,g(l,h)},render:m}}function sp(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,l={},h=_(null);let u=h,f=!1;function o(P,L,I,j,H){let G=!1;if(a){const K=g(j,I,L);u!==K&&(u=K,d(u.object)),G=p(P,j,I,H),G&&v(P,j,I,H)}else{const K=L.wireframe===!0;(u.geometry!==j.id||u.program!==I.id||u.wireframe!==K)&&(u.geometry=j.id,u.program=I.id,u.wireframe=K,G=!0)}H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),(G||f)&&(f=!1,O(P,L,I,j),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(P){return n.isWebGL2?r.bindVertexArray(P):s.bindVertexArrayOES(P)}function m(P){return n.isWebGL2?r.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function g(P,L,I){const j=I.wireframe===!0;let H=l[P.id];H===void 0&&(H={},l[P.id]=H);let G=H[L.id];G===void 0&&(G={},H[L.id]=G);let K=G[j];return K===void 0&&(K=_(c()),G[j]=K),K}function _(P){const L=[],I=[],j=[];for(let H=0;H<i;H++)L[H]=0,I[H]=0,j[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:I,attributeDivisors:j,object:P,attributes:{},index:null}}function p(P,L,I,j){const H=u.attributes,G=L.attributes;let K=0;const Z=I.getAttributes();for(const $ in Z)if(Z[$].location>=0){const J=H[$];let ae=G[$];if(ae===void 0&&($==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),$==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor)),J===void 0||J.attribute!==ae||ae&&J.data!==ae.data)return!0;K++}return u.attributesNum!==K||u.index!==j}function v(P,L,I,j){const H={},G=L.attributes;let K=0;const Z=I.getAttributes();for(const $ in Z)if(Z[$].location>=0){let J=G[$];J===void 0&&($==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),$==="instanceColor"&&P.instanceColor&&(J=P.instanceColor));const ae={};ae.attribute=J,J&&J.data&&(ae.data=J.data),H[$]=ae,K++}u.attributes=H,u.attributesNum=K,u.index=j}function x(){const P=u.newAttributes;for(let L=0,I=P.length;L<I;L++)P[L]=0}function S(P){C(P,0)}function C(P,L){const I=u.newAttributes,j=u.enabledAttributes,H=u.attributeDivisors;I[P]=1,j[P]===0&&(r.enableVertexAttribArray(P),j[P]=1),H[P]!==L&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,L),H[P]=L)}function w(){const P=u.newAttributes,L=u.enabledAttributes;for(let I=0,j=L.length;I<j;I++)L[I]!==P[I]&&(r.disableVertexAttribArray(I),L[I]=0)}function A(P,L,I,j,H,G,K){K===!0?r.vertexAttribIPointer(P,L,I,H,G):r.vertexAttribPointer(P,L,I,j,H,G)}function O(P,L,I,j){if(n.isWebGL2===!1&&(P.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const H=j.attributes,G=I.getAttributes(),K=L.defaultAttributeValues;for(const Z in G){const $=G[Z];if($.location>=0){let Y=H[Z];if(Y===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),Y!==void 0){const J=Y.normalized,ae=Y.itemSize,pe=t.get(Y);if(pe===void 0)continue;const me=pe.buffer,Ie=pe.type,Ue=pe.bytesPerElement,Ee=n.isWebGL2===!0&&(Ie===r.INT||Ie===r.UNSIGNED_INT||Y.gpuType===Vl);if(Y.isInterleavedBufferAttribute){const We=Y.data,k=We.stride,Et=Y.offset;if(We.isInstancedInterleavedBuffer){for(let ye=0;ye<$.locationSize;ye++)C($.location+ye,We.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let ye=0;ye<$.locationSize;ye++)S($.location+ye);r.bindBuffer(r.ARRAY_BUFFER,me);for(let ye=0;ye<$.locationSize;ye++)A($.location+ye,ae/$.locationSize,Ie,J,k*Ue,(Et+ae/$.locationSize*ye)*Ue,Ee)}else{if(Y.isInstancedBufferAttribute){for(let We=0;We<$.locationSize;We++)C($.location+We,Y.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let We=0;We<$.locationSize;We++)S($.location+We);r.bindBuffer(r.ARRAY_BUFFER,me);for(let We=0;We<$.locationSize;We++)A($.location+We,ae/$.locationSize,Ie,J,ae*Ue,ae/$.locationSize*We*Ue,Ee)}}else if(K!==void 0){const J=K[Z];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv($.location,J);break;case 3:r.vertexAttrib3fv($.location,J);break;case 4:r.vertexAttrib4fv($.location,J);break;default:r.vertexAttrib1fv($.location,J)}}}}w()}function M(){z();for(const P in l){const L=l[P];for(const I in L){const j=L[I];for(const H in j)m(j[H].object),delete j[H];delete L[I]}delete l[P]}}function E(P){if(l[P.id]===void 0)return;const L=l[P.id];for(const I in L){const j=L[I];for(const H in j)m(j[H].object),delete j[H];delete L[I]}delete l[P.id]}function U(P){for(const L in l){const I=l[L];if(I[P.id]===void 0)continue;const j=I[P.id];for(const H in j)m(j[H].object),delete j[H];delete I[P.id]}}function z(){N(),f=!0,u!==h&&(u=h,d(u.object))}function N(){h.geometry=null,h.program=null,h.wireframe=!1}return{setup:o,reset:z,resetDefaultState:N,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:S,disableUnusedAttributes:w}}function rp(r,e,t,n){const i=n.isWebGL2;let s;function a(f){s=f}function l(f,o){r.drawArrays(s,f,o),t.update(o,s,1)}function h(f,o,c){if(c===0)return;let d,m;if(i)d=r,m="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,f,o,c),t.update(o,s,c)}function u(f,o,c){if(c===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c;m++)this.render(f[m],o[m]);else{d.multiDrawArraysWEBGL(s,f,0,o,0,c);let m=0;for(let g=0;g<c;g++)m+=o[g];t.update(m,s,1)}}this.setMode=a,this.render=l,this.renderInstances=h,this.renderMultiDraw=u}function op(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let l=t.precision!==void 0?t.precision:"highp";const h=s(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=a||e.has("WEBGL_draw_buffers"),f=t.logarithmicDepthBuffer===!0,o=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),c=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=c>0,S=a||e.has("OES_texture_float"),C=x&&S,w=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:u,getMaxAnisotropy:i,getMaxPrecision:s,precision:l,logarithmicDepthBuffer:f,maxTextures:o,maxVertexTextures:c,maxTextureSize:d,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:w}}function ap(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Yn,l=new ke,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(o,c){const d=o.length!==0||c||n!==0||i;return i=c,n=o.length,d},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(o,c){t=f(o,c,0)},this.setState=function(o,c,d){const m=o.clippingPlanes,g=o.clipIntersection,_=o.clipShadows,p=r.get(o);if(!i||m===null||m.length===0||s&&!_)s?f(null):u();else{const v=s?0:n,x=v*4;let S=p.clippingState||null;h.value=S,S=f(m,c,x,d);for(let C=0;C!==x;++C)S[C]=t[C];p.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function u(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(o,c,d,m){const g=o!==null?o.length:0;let _=null;if(g!==0){if(_=h.value,m!==!0||_===null){const p=d+g*4,v=c.matrixWorldInverse;l.getNormalMatrix(v),(_===null||_.length<p)&&(_=new Float32Array(p));for(let x=0,S=d;x!==g;++x,S+=4)a.copy(o[x]).applyMatrix4(v,l),a.normal.toArray(_,S),_[S+3]=a.constant}h.value=_,h.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,_}}function lp(r){let e=new WeakMap;function t(a,l){return l===ho?a.mapping=Oi:l===uo&&(a.mapping=Bi),a}function n(a){if(a&&a.isTexture){const l=a.mapping;if(l===ho||l===uo)if(e.has(a)){const h=e.get(a).texture;return t(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const u=new xu(h.height/2);return u.fromEquirectangularTexture(r,a),e.set(a,u),a.addEventListener("dispose",i),t(u.texture,a.mapping)}else return null}}return a}function i(a){const l=a.target;l.removeEventListener("dispose",i);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class uc extends lc{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,l=i+t,h=i-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,l-=f*this.view.offsetY,h=l-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ci=4,Ha=[.125,.215,.35,.446,.526,.582],Zn=20,Xr=new uc,Ga=new Le;let qr=null,Yr=0,jr=0;const jn=(1+Math.sqrt(5))/2,Mi=1/jn,ka=[new F(1,1,1),new F(-1,1,1),new F(1,1,-1),new F(-1,1,-1),new F(0,jn,Mi),new F(0,jn,-Mi),new F(Mi,0,jn),new F(-Mi,0,jn),new F(jn,Mi,0),new F(-jn,Mi,0)];class Va{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){qr=this._renderer.getRenderTarget(),Yr=this._renderer.getActiveCubeFace(),jr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qr,Yr,jr),e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qr=this._renderer.getRenderTarget(),Yr=this._renderer.getActiveCubeFace(),jr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:hs,format:Qt,colorSpace:bn,depthBuffer:!1},i=Wa(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wa(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(s)),this._blurMaterial=hp(s,e,t)}return i}_compileMaterial(e){const t=new xt(this._lodPlanes[0],e);this._renderer.compile(t,Xr)}_sceneToCubeUV(e,t,n,i){const l=new zt(90,1,t,n),h=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,o=f.autoClear,c=f.toneMapping;f.getClearColor(Ga),f.toneMapping=Nn,f.autoClear=!1;const d=new ds({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),m=new xt(new ri,d);let g=!1;const _=e.background;_?_.isColor&&(d.color.copy(_),e.background=null,g=!0):(d.color.copy(Ga),g=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(l.up.set(0,h[p],0),l.lookAt(u[p],0,0)):v===1?(l.up.set(0,0,h[p]),l.lookAt(0,u[p],0)):(l.up.set(0,h[p],0),l.lookAt(0,0,u[p]));const x=this._cubeSize;Hs(i,v*x,p>2?x:0,x,x),f.setRenderTarget(i),g&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=c,f.autoClear=o,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Oi||e.mapping===Bi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=qa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xa());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new xt(this._lodPlanes[0],s),l=s.uniforms;l.envMap.value=e;const h=this._cubeSize;Hs(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(a,Xr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=ka[(i-1)%ka.length];this._blur(e,i-1,i,s,a)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,l){const h=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,o=new xt(this._lodPlanes[i],u),c=u.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Zn-1),g=s/m,_=isFinite(s)?1+Math.floor(f*g):Zn;_>Zn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Zn}`);const p=[];let v=0;for(let A=0;A<Zn;++A){const O=A/g,M=Math.exp(-O*O/2);p.push(M),A===0?v+=M:A<_&&(v+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;c.envMap.value=e.texture,c.samples.value=_,c.weights.value=p,c.latitudinal.value=a==="latitudinal",l&&(c.poleAxis.value=l);const{_lodMax:x}=this;c.dTheta.value=m,c.mipInt.value=x-n;const S=this._sizeLods[i],C=3*S*(i>x-Ci?i-x+Ci:0),w=4*(this._cubeSize-S);Hs(t,C,w,3*S,2*S),h.setRenderTarget(t),h.render(o,Xr)}}function cp(r){const e=[],t=[],n=[];let i=r;const s=r-Ci+1+Ha.length;for(let a=0;a<s;a++){const l=Math.pow(2,i);t.push(l);let h=1/l;a>r-Ci?h=Ha[a-r+Ci-1]:a===0&&(h=0),n.push(h);const u=1/(l-2),f=-u,o=1+u,c=[f,f,o,f,o,o,f,f,o,o,f,o],d=6,m=6,g=3,_=2,p=1,v=new Float32Array(g*m*d),x=new Float32Array(_*m*d),S=new Float32Array(p*m*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,O=w>2?0:-1,M=[A,O,0,A+2/3,O,0,A+2/3,O+1,0,A,O,0,A+2/3,O+1,0,A,O+1,0];v.set(M,g*m*w),x.set(c,_*m*w);const E=[w,w,w,w,w,w];S.set(E,p*m*w)}const C=new Nt;C.setAttribute("position",new Ht(v,g)),C.setAttribute("uv",new Ht(x,_)),C.setAttribute("faceIndex",new Ht(S,p)),e.push(C),i>Ci&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Wa(r,e,t){const n=new ii(r,e,t);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function hp(r,e,t){const n=new Float32Array(Zn),i=new F(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Xa(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function qa(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Po(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function up(r){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const h=l.mapping,u=h===ho||h===uo,f=h===Oi||h===Bi;if(u||f)if(l.isRenderTargetTexture&&l.needsPMREMUpdate===!0){l.needsPMREMUpdate=!1;let o=e.get(l);return t===null&&(t=new Va(r)),o=u?t.fromEquirectangular(l,o):t.fromCubemap(l,o),e.set(l,o),o.texture}else{if(e.has(l))return e.get(l).texture;{const o=l.image;if(u&&o&&o.height>0||f&&o&&i(o)){t===null&&(t=new Va(r));const c=u?t.fromEquirectangular(l):t.fromCubemap(l);return e.set(l,c),l.addEventListener("dispose",s),c.texture}else return null}}}return l}function i(l){let h=0;const u=6;for(let f=0;f<u;f++)l[f]!==void 0&&h++;return h===u}function s(l){const h=l.target;h.removeEventListener("dispose",s);const u=e.get(h);u!==void 0&&(e.delete(h),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function dp(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function fp(r,e,t,n){const i={},s=new WeakMap;function a(o){const c=o.target;c.index!==null&&e.remove(c.index);for(const m in c.attributes)e.remove(c.attributes[m]);for(const m in c.morphAttributes){const g=c.morphAttributes[m];for(let _=0,p=g.length;_<p;_++)e.remove(g[_])}c.removeEventListener("dispose",a),delete i[c.id];const d=s.get(c);d&&(e.remove(d),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(o,c){return i[c.id]===!0||(c.addEventListener("dispose",a),i[c.id]=!0,t.memory.geometries++),c}function h(o){const c=o.attributes;for(const m in c)e.update(c[m],r.ARRAY_BUFFER);const d=o.morphAttributes;for(const m in d){const g=d[m];for(let _=0,p=g.length;_<p;_++)e.update(g[_],r.ARRAY_BUFFER)}}function u(o){const c=[],d=o.index,m=o.attributes.position;let g=0;if(d!==null){const v=d.array;g=d.version;for(let x=0,S=v.length;x<S;x+=3){const C=v[x+0],w=v[x+1],A=v[x+2];c.push(C,w,w,A,A,C)}}else if(m!==void 0){const v=m.array;g=m.version;for(let x=0,S=v.length/3-1;x<S;x+=3){const C=x+0,w=x+1,A=x+2;c.push(C,w,w,A,A,C)}}else return;const _=new(Jl(c)?oc:rc)(c,1);_.version=g;const p=s.get(o);p&&e.remove(p),s.set(o,_)}function f(o){const c=s.get(o);if(c){const d=o.index;d!==null&&c.version<d.version&&u(o)}else u(o);return s.get(o)}return{get:l,update:h,getWireframeAttribute:f}}function pp(r,e,t,n){const i=n.isWebGL2;let s;function a(d){s=d}let l,h;function u(d){l=d.type,h=d.bytesPerElement}function f(d,m){r.drawElements(s,m,l,d*h),t.update(m,s,1)}function o(d,m,g){if(g===0)return;let _,p;if(i)_=r,p="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[p](s,m,l,d*h,g),t.update(m,s,g)}function c(d,m,g){if(g===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<g;p++)this.render(d[p]/h,m[p]);else{_.multiDrawElementsWEBGL(s,m,0,l,d,0,g);let p=0;for(let v=0;v<g;v++)p+=m[v];t.update(p,s,1)}}this.setMode=a,this.setIndex=u,this.render=f,this.renderInstances=o,this.renderMultiDraw=c}function mp(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,l){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=l*(s/3);break;case r.LINES:t.lines+=l*(s/2);break;case r.LINE_STRIP:t.lines+=l*(s-1);break;case r.LINE_LOOP:t.lines+=l*s;break;case r.POINTS:t.points+=l*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function _p(r,e){return r[0]-e[0]}function gp(r,e){return Math.abs(e[1])-Math.abs(r[1])}function vp(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,a=new tt,l=[];for(let u=0;u<8;u++)l[u]=[u,0];function h(u,f,o){const c=u.morphTargetInfluences;if(e.isWebGL2===!0){const d=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,m=d!==void 0?d.length:0;let g=s.get(f);if(g===void 0||g.count!==m){let P=function(){z.dispose(),s.delete(f),f.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const v=f.morphAttributes.position!==void 0,x=f.morphAttributes.normal!==void 0,S=f.morphAttributes.color!==void 0,C=f.morphAttributes.position||[],w=f.morphAttributes.normal||[],A=f.morphAttributes.color||[];let O=0;v===!0&&(O=1),x===!0&&(O=2),S===!0&&(O=3);let M=f.attributes.position.count*O,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const U=new Float32Array(M*E*4*m),z=new tc(U,M,E,m);z.type=In,z.needsUpdate=!0;const N=O*4;for(let L=0;L<m;L++){const I=C[L],j=w[L],H=A[L],G=M*E*4*L;for(let K=0;K<I.count;K++){const Z=K*N;v===!0&&(a.fromBufferAttribute(I,K),U[G+Z+0]=a.x,U[G+Z+1]=a.y,U[G+Z+2]=a.z,U[G+Z+3]=0),x===!0&&(a.fromBufferAttribute(j,K),U[G+Z+4]=a.x,U[G+Z+5]=a.y,U[G+Z+6]=a.z,U[G+Z+7]=0),S===!0&&(a.fromBufferAttribute(H,K),U[G+Z+8]=a.x,U[G+Z+9]=a.y,U[G+Z+10]=a.z,U[G+Z+11]=H.itemSize===4?a.w:1)}}g={count:m,texture:z,size:new Ae(M,E)},s.set(f,g),f.addEventListener("dispose",P)}let _=0;for(let v=0;v<c.length;v++)_+=c[v];const p=f.morphTargetsRelative?1:1-_;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",c),o.getUniforms().setValue(r,"morphTargetsTexture",g.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}else{const d=c===void 0?0:c.length;let m=n[f.id];if(m===void 0||m.length!==d){m=[];for(let x=0;x<d;x++)m[x]=[x,0];n[f.id]=m}for(let x=0;x<d;x++){const S=m[x];S[0]=x,S[1]=c[x]}m.sort(gp);for(let x=0;x<8;x++)x<d&&m[x][1]?(l[x][0]=m[x][0],l[x][1]=m[x][1]):(l[x][0]=Number.MAX_SAFE_INTEGER,l[x][1]=0);l.sort(_p);const g=f.morphAttributes.position,_=f.morphAttributes.normal;let p=0;for(let x=0;x<8;x++){const S=l[x],C=S[0],w=S[1];C!==Number.MAX_SAFE_INTEGER&&w?(g&&f.getAttribute("morphTarget"+x)!==g[C]&&f.setAttribute("morphTarget"+x,g[C]),_&&f.getAttribute("morphNormal"+x)!==_[C]&&f.setAttribute("morphNormal"+x,_[C]),i[x]=w,p+=w):(g&&f.hasAttribute("morphTarget"+x)===!0&&f.deleteAttribute("morphTarget"+x),_&&f.hasAttribute("morphNormal"+x)===!0&&f.deleteAttribute("morphNormal"+x),i[x]=0)}const v=f.morphTargetsRelative?1:1-p;o.getUniforms().setValue(r,"morphTargetBaseInfluence",v),o.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:h}}function xp(r,e,t,n){let i=new WeakMap;function s(h){const u=n.render.frame,f=h.geometry,o=e.get(h,f);if(i.get(o)!==u&&(e.update(o),i.set(o,u)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),i.get(h)!==u&&(t.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,r.ARRAY_BUFFER),i.set(h,u))),h.isSkinnedMesh){const c=h.skeleton;i.get(c)!==u&&(c.update(),i.set(c,u))}return o}function a(){i=new WeakMap}function l(h){const u=h.target;u.removeEventListener("dispose",l),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:a}}class dc extends Ut{constructor(e,t,n,i,s,a,l,h,u,f){if(f=f!==void 0?f:ei,f!==ei&&f!==zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===ei&&(n=Ln),n===void 0&&f===zi&&(n=Qn),super(null,i,s,a,l,h,f,n,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:Ct,this.minFilter=h!==void 0?h:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const fc=new Ut,pc=new dc(1,1);pc.compareFunction=Kl;const mc=new tc,_c=new nu,gc=new cc,Ya=[],ja=[],$a=new Float32Array(16),Za=new Float32Array(9),Ka=new Float32Array(4);function Vi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ya[i];if(s===void 0&&(s=new Float32Array(i),Ya[i]=s),e!==0){n.toArray(s,0);for(let a=1,l=0;a!==e;++a)l+=t,r[a].toArray(s,l)}return s}function ft(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function pt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function mr(r,e){let t=ja[e];t===void 0&&(t=new Int32Array(e),ja[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function yp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Mp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;r.uniform2fv(this.addr,e),pt(t,e)}}function Sp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;r.uniform3fv(this.addr,e),pt(t,e)}}function bp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;r.uniform4fv(this.addr,e),pt(t,e)}}function Ep(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Ka.set(n),r.uniformMatrix2fv(this.addr,!1,Ka),pt(t,n)}}function wp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Za.set(n),r.uniformMatrix3fv(this.addr,!1,Za),pt(t,n)}}function Tp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;$a.set(n),r.uniformMatrix4fv(this.addr,!1,$a),pt(t,n)}}function Ap(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Rp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;r.uniform2iv(this.addr,e),pt(t,e)}}function Cp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;r.uniform3iv(this.addr,e),pt(t,e)}}function Pp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;r.uniform4iv(this.addr,e),pt(t,e)}}function Lp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Ip(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;r.uniform2uiv(this.addr,e),pt(t,e)}}function Dp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;r.uniform3uiv(this.addr,e),pt(t,e)}}function Up(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;r.uniform4uiv(this.addr,e),pt(t,e)}}function Np(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?pc:fc;t.setTexture2D(e||s,i)}function Fp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||_c,i)}function Op(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||gc,i)}function Bp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||mc,i)}function zp(r){switch(r){case 5126:return yp;case 35664:return Mp;case 35665:return Sp;case 35666:return bp;case 35674:return Ep;case 35675:return wp;case 35676:return Tp;case 5124:case 35670:return Ap;case 35667:case 35671:return Rp;case 35668:case 35672:return Cp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Ip;case 36295:return Dp;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Bp}}function Hp(r,e){r.uniform1fv(this.addr,e)}function Gp(r,e){const t=Vi(e,this.size,2);r.uniform2fv(this.addr,t)}function kp(r,e){const t=Vi(e,this.size,3);r.uniform3fv(this.addr,t)}function Vp(r,e){const t=Vi(e,this.size,4);r.uniform4fv(this.addr,t)}function Wp(r,e){const t=Vi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Xp(r,e){const t=Vi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function qp(r,e){const t=Vi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Yp(r,e){r.uniform1iv(this.addr,e)}function jp(r,e){r.uniform2iv(this.addr,e)}function $p(r,e){r.uniform3iv(this.addr,e)}function Zp(r,e){r.uniform4iv(this.addr,e)}function Kp(r,e){r.uniform1uiv(this.addr,e)}function Jp(r,e){r.uniform2uiv(this.addr,e)}function Qp(r,e){r.uniform3uiv(this.addr,e)}function em(r,e){r.uniform4uiv(this.addr,e)}function tm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);ft(n,s)||(r.uniform1iv(this.addr,s),pt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||fc,s[a])}function nm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);ft(n,s)||(r.uniform1iv(this.addr,s),pt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||_c,s[a])}function im(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);ft(n,s)||(r.uniform1iv(this.addr,s),pt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||gc,s[a])}function sm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);ft(n,s)||(r.uniform1iv(this.addr,s),pt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||mc,s[a])}function rm(r){switch(r){case 5126:return Hp;case 35664:return Gp;case 35665:return kp;case 35666:return Vp;case 35674:return Wp;case 35675:return Xp;case 35676:return qp;case 5124:case 35670:return Yp;case 35667:case 35671:return jp;case 35668:case 35672:return $p;case 35669:case 35673:return Zp;case 5125:return Kp;case 36294:return Jp;case 36295:return Qp;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}class om{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zp(t.type)}}class am{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rm(t.type)}}class lm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const l=i[s];l.setValue(e,t[l.id],n)}}}const $r=/(\w+)(\])?(\[|\.)?/g;function Ja(r,e){r.seq.push(e),r.map[e.id]=e}function cm(r,e,t){const n=r.name,i=n.length;for($r.lastIndex=0;;){const s=$r.exec(n),a=$r.lastIndex;let l=s[1];const h=s[2]==="]",u=s[3];if(h&&(l=l|0),u===void 0||u==="["&&a+2===i){Ja(t,u===void 0?new om(l,r,e):new am(l,r,e));break}else{let o=t.map[l];o===void 0&&(o=new lm(l),Ja(t,o)),t=o}}}class Qs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);cm(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const l=t[s],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Qa(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const hm=37297;let um=0;function dm(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const l=a+1;n.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return n.join(`
`)}function fm(r){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(r);let n;switch(e===t?n="":e===ir&&t===nr?n="LinearDisplayP3ToLinearSRGB":e===nr&&t===ir&&(n="LinearSRGBToLinearDisplayP3"),r){case bn:case dr:return[n,"LinearTransferOETF"];case vt:case To:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function el(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+dm(r.getShaderSource(e),a)}else return i}function pm(r,e){const t=fm(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function mm(r,e){let t;switch(e){case fh:t="Linear";break;case ph:t="Reinhard";break;case mh:t="OptimizedCineon";break;case Gl:t="ACESFilmic";break;case gh:t="AgX";break;case _h:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function _m(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pi).join(`
`)}function gm(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Pi).join(`
`)}function vm(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xm(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let l=1;s.type===r.FLOAT_MAT2&&(l=2),s.type===r.FLOAT_MAT3&&(l=3),s.type===r.FLOAT_MAT4&&(l=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:l}}return t}function Pi(r){return r!==""}function tl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ym=/^[ \t]*#include +<([\w\d./]+)>/gm;function go(r){return r.replace(ym,Sm)}const Mm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Sm(r,e){let t=Fe[e];if(t===void 0){const n=Mm.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return go(t)}const bm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(r){return r.replace(bm,Em)}function Em(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function sl(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function wm(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===zl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Hl?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===xn&&(e="SHADOWMAP_TYPE_VSM"),e}function Tm(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Oi:case Bi:e="ENVMAP_TYPE_CUBE";break;case ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Am(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Bi:e="ENVMAP_MODE_REFRACTION";break}return e}function Rm(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case bo:e="ENVMAP_BLENDING_MULTIPLY";break;case uh:e="ENVMAP_BLENDING_MIX";break;case dh:e="ENVMAP_BLENDING_ADD";break}return e}function Cm(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Pm(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,l=t.fragmentShader;const h=wm(t),u=Tm(t),f=Am(t),o=Rm(t),c=Cm(t),d=t.isWebGL2?"":_m(t),m=gm(t),g=vm(s),_=i.createProgram();let p,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pi).join(`
`),p.length>0&&(p+=`
`),v=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pi).join(`
`),v.length>0&&(v+=`
`)):(p=[sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pi).join(`
`),v=[d,sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMap?"#define "+o:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Nn?mm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,pm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pi).join(`
`)),a=go(a),a=tl(a,t),a=nl(a,t),l=go(l),l=tl(l,t),l=nl(l,t),a=il(a),l=il(l),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Sa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const S=x+p+a,C=x+v+l,w=Qa(i,i.VERTEX_SHADER,S),A=Qa(i,i.FRAGMENT_SHADER,C);i.attachShader(_,w),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function O(z){if(r.debug.checkShaderErrors){const N=i.getProgramInfoLog(_).trim(),P=i.getShaderInfoLog(w).trim(),L=i.getShaderInfoLog(A).trim();let I=!0,j=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(I=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,A);else{const H=el(i,w,"vertex"),G=el(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+H+`
`+G)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(P===""||L==="")&&(j=!1);j&&(z.diagnostics={runnable:I,programLog:N,vertexShader:{log:P,prefix:p},fragmentShader:{log:L,prefix:v}})}i.deleteShader(w),i.deleteShader(A),M=new Qs(i,_),E=xm(i,_)}let M;this.getUniforms=function(){return M===void 0&&O(this),M};let E;this.getAttributes=function(){return E===void 0&&O(this),E};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(_,hm)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=um++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}let Lm=0;class Im{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dm(e),t.set(e,n)),n}}class Dm{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Um(r,e,t,n,i,s,a){const l=new ic,h=new Im,u=[],f=i.isWebGL2,o=i.logarithmicDepthBuffer,c=i.vertexTextures;let d=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return M===0?"uv":`uv${M}`}function _(M,E,U,z,N){const P=z.fog,L=N.geometry,I=M.isMeshStandardMaterial?z.environment:null,j=(M.isMeshStandardMaterial?t:e).get(M.envMap||I),H=j&&j.mapping===ur?j.image.height:null,G=m[M.type];M.precision!==null&&(d=i.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const K=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,Z=K!==void 0?K.length:0;let $=0;L.morphAttributes.position!==void 0&&($=1),L.morphAttributes.normal!==void 0&&($=2),L.morphAttributes.color!==void 0&&($=3);let Y,J,ae,pe;if(G){const wt=on[G];Y=wt.vertexShader,J=wt.fragmentShader}else Y=M.vertexShader,J=M.fragmentShader,h.update(M),ae=h.getVertexShaderID(M),pe=h.getFragmentShaderID(M);const me=r.getRenderTarget(),Ie=N.isInstancedMesh===!0,Ue=N.isBatchedMesh===!0,Ee=!!M.map,We=!!M.matcap,k=!!j,Et=!!M.aoMap,ye=!!M.lightMap,Ce=!!M.bumpMap,_e=!!M.normalMap,nt=!!M.displacementMap,Oe=!!M.emissiveMap,R=!!M.metalnessMap,b=!!M.roughnessMap,W=M.anisotropy>0,te=M.clearcoat>0,ee=M.iridescence>0,ne=M.sheen>0,ge=M.transmission>0,le=W&&!!M.anisotropyMap,de=te&&!!M.clearcoatMap,be=te&&!!M.clearcoatNormalMap,Be=te&&!!M.clearcoatRoughnessMap,Q=ee&&!!M.iridescenceMap,Ye=ee&&!!M.iridescenceThicknessMap,Ve=ne&&!!M.sheenColorMap,Re=ne&&!!M.sheenRoughnessMap,xe=!!M.specularMap,fe=!!M.specularColorMap,Ne=!!M.specularIntensityMap,qe=ge&&!!M.transmissionMap,st=ge&&!!M.thicknessMap,He=!!M.gradientMap,ie=!!M.alphaMap,D=M.alphaTest>0,re=!!M.alphaHash,oe=!!M.extensions,we=!!L.attributes.uv1,Me=!!L.attributes.uv2,Ze=!!L.attributes.uv3;let Ke=Nn;return M.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Ke=r.toneMapping),{isWebGL2:f,shaderID:G,shaderType:M.type,shaderName:M.name,vertexShader:Y,fragmentShader:J,defines:M.defines,customVertexShaderID:ae,customFragmentShaderID:pe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Ue,instancing:Ie,instancingColor:Ie&&N.instanceColor!==null,supportsVertexTextures:c,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:bn,map:Ee,matcap:We,envMap:k,envMapMode:k&&j.mapping,envMapCubeUVHeight:H,aoMap:Et,lightMap:ye,bumpMap:Ce,normalMap:_e,displacementMap:c&&nt,emissiveMap:Oe,normalMapObjectSpace:_e&&M.normalMapType===Ch,normalMapTangentSpace:_e&&M.normalMapType===wo,metalnessMap:R,roughnessMap:b,anisotropy:W,anisotropyMap:le,clearcoat:te,clearcoatMap:de,clearcoatNormalMap:be,clearcoatRoughnessMap:Be,iridescence:ee,iridescenceMap:Q,iridescenceThicknessMap:Ye,sheen:ne,sheenColorMap:Ve,sheenRoughnessMap:Re,specularMap:xe,specularColorMap:fe,specularIntensityMap:Ne,transmission:ge,transmissionMap:qe,thicknessMap:st,gradientMap:He,opaque:M.transparent===!1&&M.blending===Di,alphaMap:ie,alphaTest:D,alphaHash:re,combine:M.combine,mapUv:Ee&&g(M.map.channel),aoMapUv:Et&&g(M.aoMap.channel),lightMapUv:ye&&g(M.lightMap.channel),bumpMapUv:Ce&&g(M.bumpMap.channel),normalMapUv:_e&&g(M.normalMap.channel),displacementMapUv:nt&&g(M.displacementMap.channel),emissiveMapUv:Oe&&g(M.emissiveMap.channel),metalnessMapUv:R&&g(M.metalnessMap.channel),roughnessMapUv:b&&g(M.roughnessMap.channel),anisotropyMapUv:le&&g(M.anisotropyMap.channel),clearcoatMapUv:de&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:be&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Re&&g(M.sheenRoughnessMap.channel),specularMapUv:xe&&g(M.specularMap.channel),specularColorMapUv:fe&&g(M.specularColorMap.channel),specularIntensityMapUv:Ne&&g(M.specularIntensityMap.channel),transmissionMapUv:qe&&g(M.transmissionMap.channel),thicknessMapUv:st&&g(M.thicknessMap.channel),alphaMapUv:ie&&g(M.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(_e||W),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Me,vertexUv3s:Ze,pointsUvs:N.isPoints===!0&&!!L.attributes.uv&&(Ee||ie),fog:!!P,useFog:M.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:o,skinning:N.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:$,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ke,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ee&&M.map.isVideoTexture===!0&&$e.getTransfer(M.map.colorSpace)===et,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Kt,flipSided:M.side===Dt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:oe&&M.extensions.derivatives===!0,extensionFragDepth:oe&&M.extensions.fragDepth===!0,extensionDrawBuffers:oe&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:f||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:f||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:f||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const U in M.defines)E.push(U),E.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(v(E,M),x(E,M),E.push(r.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function v(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function x(M,E){l.disableAll(),E.isWebGL2&&l.enable(0),E.supportsVertexTextures&&l.enable(1),E.instancing&&l.enable(2),E.instancingColor&&l.enable(3),E.matcap&&l.enable(4),E.envMap&&l.enable(5),E.normalMapObjectSpace&&l.enable(6),E.normalMapTangentSpace&&l.enable(7),E.clearcoat&&l.enable(8),E.iridescence&&l.enable(9),E.alphaTest&&l.enable(10),E.vertexColors&&l.enable(11),E.vertexAlphas&&l.enable(12),E.vertexUv1s&&l.enable(13),E.vertexUv2s&&l.enable(14),E.vertexUv3s&&l.enable(15),E.vertexTangents&&l.enable(16),E.anisotropy&&l.enable(17),E.alphaHash&&l.enable(18),E.batching&&l.enable(19),M.push(l.mask),l.disableAll(),E.fog&&l.enable(0),E.useFog&&l.enable(1),E.flatShading&&l.enable(2),E.logarithmicDepthBuffer&&l.enable(3),E.skinning&&l.enable(4),E.morphTargets&&l.enable(5),E.morphNormals&&l.enable(6),E.morphColors&&l.enable(7),E.premultipliedAlpha&&l.enable(8),E.shadowMapEnabled&&l.enable(9),E.useLegacyLights&&l.enable(10),E.doubleSided&&l.enable(11),E.flipSided&&l.enable(12),E.useDepthPacking&&l.enable(13),E.dithering&&l.enable(14),E.transmission&&l.enable(15),E.sheen&&l.enable(16),E.opaque&&l.enable(17),E.pointsUvs&&l.enable(18),E.decodeVideoTexture&&l.enable(19),M.push(l.mask)}function S(M){const E=m[M.type];let U;if(E){const z=on[E];U=mu.clone(z.uniforms)}else U=M.uniforms;return U}function C(M,E){let U;for(let z=0,N=u.length;z<N;z++){const P=u[z];if(P.cacheKey===E){U=P,++U.usedTimes;break}}return U===void 0&&(U=new Pm(r,E,M,s),u.push(U)),U}function w(M){if(--M.usedTimes===0){const E=u.indexOf(M);u[E]=u[u.length-1],u.pop(),M.destroy()}}function A(M){h.remove(M)}function O(){h.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:O}}function Nm(){let r=new WeakMap;function e(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function t(s){r.delete(s)}function n(s,a,l){r.get(s)[a]=l}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Fm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function rl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ol(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(o,c,d,m,g,_){let p=r[e];return p===void 0?(p={id:o.id,object:o,geometry:c,material:d,groupOrder:m,renderOrder:o.renderOrder,z:g,group:_},r[e]=p):(p.id=o.id,p.object=o,p.geometry=c,p.material=d,p.groupOrder=m,p.renderOrder=o.renderOrder,p.z=g,p.group=_),e++,p}function l(o,c,d,m,g,_){const p=a(o,c,d,m,g,_);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function h(o,c,d,m,g,_){const p=a(o,c,d,m,g,_);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function u(o,c){t.length>1&&t.sort(o||Fm),n.length>1&&n.sort(c||rl),i.length>1&&i.sort(c||rl)}function f(){for(let o=e,c=r.length;o<c;o++){const d=r[o];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:h,finish:f,sort:u}}function Om(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new ol,r.set(n,[a])):i>=s.length?(a=new ol,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Bm(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Le};break;case"SpotLight":t={position:new F,direction:new F,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new F,halfWidth:new F,halfHeight:new F};break}return r[e.id]=t,t}}}function zm(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Hm=0;function Gm(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function km(r,e){const t=new Bm,n=zm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)i.probe.push(new F);const s=new F,a=new ot,l=new ot;function h(f,o){let c=0,d=0,m=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let g=0,_=0,p=0,v=0,x=0,S=0,C=0,w=0,A=0,O=0,M=0;f.sort(Gm);const E=o===!0?Math.PI:1;for(let z=0,N=f.length;z<N;z++){const P=f[z],L=P.color,I=P.intensity,j=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)c+=L.r*I*E,d+=L.g*I*E,m+=L.b*I*E;else if(P.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(P.sh.coefficients[G],I);M++}else if(P.isDirectionalLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity*E),P.castShadow){const K=P.shadow,Z=n.get(P);Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,i.directionalShadow[g]=Z,i.directionalShadowMap[g]=H,i.directionalShadowMatrix[g]=P.shadow.matrix,S++}i.directional[g]=G,g++}else if(P.isSpotLight){const G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(L).multiplyScalar(I*E),G.distance=j,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,i.spot[p]=G;const K=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,K.updateMatrices(P),P.castShadow&&O++),i.spotLightMatrix[p]=K.matrix,P.castShadow){const Z=n.get(P);Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,i.spotShadow[p]=Z,i.spotShadowMap[p]=H,w++}p++}else if(P.isRectAreaLight){const G=t.get(P);G.color.copy(L).multiplyScalar(I),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),i.rectArea[v]=G,v++}else if(P.isPointLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity*E),G.distance=P.distance,G.decay=P.decay,P.castShadow){const K=P.shadow,Z=n.get(P);Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,Z.shadowCameraNear=K.camera.near,Z.shadowCameraFar=K.camera.far,i.pointShadow[_]=Z,i.pointShadowMap[_]=H,i.pointShadowMatrix[_]=P.shadow.matrix,C++}i.point[_]=G,_++}else if(P.isHemisphereLight){const G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(I*E),G.groundColor.copy(P.groundColor).multiplyScalar(I*E),i.hemi[x]=G,x++}}v>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=m;const U=i.hash;(U.directionalLength!==g||U.pointLength!==_||U.spotLength!==p||U.rectAreaLength!==v||U.hemiLength!==x||U.numDirectionalShadows!==S||U.numPointShadows!==C||U.numSpotShadows!==w||U.numSpotMaps!==A||U.numLightProbes!==M)&&(i.directional.length=g,i.spot.length=p,i.rectArea.length=v,i.point.length=_,i.hemi.length=x,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=w+A-O,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=O,i.numLightProbes=M,U.directionalLength=g,U.pointLength=_,U.spotLength=p,U.rectAreaLength=v,U.hemiLength=x,U.numDirectionalShadows=S,U.numPointShadows=C,U.numSpotShadows=w,U.numSpotMaps=A,U.numLightProbes=M,i.version=Hm++)}function u(f,o){let c=0,d=0,m=0,g=0,_=0;const p=o.matrixWorldInverse;for(let v=0,x=f.length;v<x;v++){const S=f[v];if(S.isDirectionalLight){const C=i.directional[c];C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),c++}else if(S.isSpotLight){const C=i.spot[m];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const C=i.rectArea[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),l.identity(),a.copy(S.matrixWorld),a.premultiply(p),l.extractRotation(a),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(l),C.halfHeight.applyMatrix4(l),g++}else if(S.isPointLight){const C=i.point[d];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const C=i.hemi[_];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(p),_++}}}return{setup:h,setupView:u,state:i}}function al(r,e){const t=new km(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function a(o){n.push(o)}function l(o){i.push(o)}function h(o){t.setup(n,o)}function u(o){t.setupView(n,o)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:h,setupLightsView:u,pushLight:a,pushShadow:l}}function Vm(r,e){let t=new WeakMap;function n(s,a=0){const l=t.get(s);let h;return l===void 0?(h=new al(r,e),t.set(s,[h])):a>=l.length?(h=new al(r,e),l.push(h)):h=l[a],h}function i(){t=new WeakMap}return{get:n,dispose:i}}class Wm extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xm extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jm(r,e,t){let n=new Ro;const i=new Ae,s=new Ae,a=new tt,l=new Wm({depthPacking:Rh}),h=new Xm,u={},f=t.maxTextureSize,o={[On]:Dt,[Dt]:On,[Kt]:Kt},c=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:qm,fragmentShader:Ym}),d=c.clone();d.defines.HORIZONTAL_PASS=1;const m=new Nt;m.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new xt(m,c),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zl;let p=this.type;this.render=function(w,A,O){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||w.length===0)return;const M=r.getRenderTarget(),E=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),z=r.state;z.setBlending(Un),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const N=p!==xn&&this.type===xn,P=p===xn&&this.type!==xn;for(let L=0,I=w.length;L<I;L++){const j=w[L],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const G=H.getFrameExtents();if(i.multiply(G),s.copy(H.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/G.x),i.x=s.x*G.x,H.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/G.y),i.y=s.y*G.y,H.mapSize.y=s.y)),H.map===null||N===!0||P===!0){const Z=this.type!==xn?{minFilter:Ct,magFilter:Ct}:{};H.map!==null&&H.map.dispose(),H.map=new ii(i.x,i.y,Z),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const K=H.getViewportCount();for(let Z=0;Z<K;Z++){const $=H.getViewport(Z);a.set(s.x*$.x,s.y*$.y,s.x*$.z,s.y*$.w),z.viewport(a),H.updateMatrices(j,Z),n=H.getFrustum(),S(A,O,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===xn&&v(H,O),H.needsUpdate=!1}p=this.type,_.needsUpdate=!1,r.setRenderTarget(M,E,U)};function v(w,A){const O=e.update(g);c.defines.VSM_SAMPLES!==w.blurSamples&&(c.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,c.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ii(i.x,i.y)),c.uniforms.shadow_pass.value=w.map.texture,c.uniforms.resolution.value=w.mapSize,c.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(A,null,O,c,g,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(A,null,O,d,g,null)}function x(w,A,O,M){let E=null;const U=O.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)E=U;else if(E=O.isPointLight===!0?h:l,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=E.uuid,N=A.uuid;let P=u[z];P===void 0&&(P={},u[z]=P);let L=P[N];L===void 0&&(L=E.clone(),P[N]=L,A.addEventListener("dispose",C)),E=L}if(E.visible=A.visible,E.wireframe=A.wireframe,M===xn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:o[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,O.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const z=r.properties.get(E);z.light=O}return E}function S(w,A,O,M,E){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===xn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,w.matrixWorld);const N=e.update(w),P=w.material;if(Array.isArray(P)){const L=N.groups;for(let I=0,j=L.length;I<j;I++){const H=L[I],G=P[H.materialIndex];if(G&&G.visible){const K=x(w,G,M,E);w.onBeforeShadow(r,w,A,O,N,K,H),r.renderBufferDirect(O,null,N,K,w,H),w.onAfterShadow(r,w,A,O,N,K,H)}}}else if(P.visible){const L=x(w,P,M,E);w.onBeforeShadow(r,w,A,O,N,L,null),r.renderBufferDirect(O,null,N,L,w,null),w.onAfterShadow(r,w,A,O,N,L,null)}}const z=w.children;for(let N=0,P=z.length;N<P;N++)S(z[N],A,O,M,E)}function C(w){w.target.removeEventListener("dispose",C);for(const O in u){const M=u[O],E=w.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function $m(r,e,t){const n=t.isWebGL2;function i(){let D=!1;const re=new tt;let oe=null;const we=new tt(0,0,0,0);return{setMask:function(Me){oe!==Me&&!D&&(r.colorMask(Me,Me,Me,Me),oe=Me)},setLocked:function(Me){D=Me},setClear:function(Me,Ze,Ke,mt,wt){wt===!0&&(Me*=mt,Ze*=mt,Ke*=mt),re.set(Me,Ze,Ke,mt),we.equals(re)===!1&&(r.clearColor(Me,Ze,Ke,mt),we.copy(re))},reset:function(){D=!1,oe=null,we.set(-1,0,0,0)}}}function s(){let D=!1,re=null,oe=null,we=null;return{setTest:function(Me){Me?Ue(r.DEPTH_TEST):Ee(r.DEPTH_TEST)},setMask:function(Me){re!==Me&&!D&&(r.depthMask(Me),re=Me)},setFunc:function(Me){if(oe!==Me){switch(Me){case sh:r.depthFunc(r.NEVER);break;case rh:r.depthFunc(r.ALWAYS);break;case oh:r.depthFunc(r.LESS);break;case er:r.depthFunc(r.LEQUAL);break;case ah:r.depthFunc(r.EQUAL);break;case lh:r.depthFunc(r.GEQUAL);break;case ch:r.depthFunc(r.GREATER);break;case hh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}oe=Me}},setLocked:function(Me){D=Me},setClear:function(Me){we!==Me&&(r.clearDepth(Me),we=Me)},reset:function(){D=!1,re=null,oe=null,we=null}}}function a(){let D=!1,re=null,oe=null,we=null,Me=null,Ze=null,Ke=null,mt=null,wt=null;return{setTest:function(Je){D||(Je?Ue(r.STENCIL_TEST):Ee(r.STENCIL_TEST))},setMask:function(Je){re!==Je&&!D&&(r.stencilMask(Je),re=Je)},setFunc:function(Je,Tt,tn){(oe!==Je||we!==Tt||Me!==tn)&&(r.stencilFunc(Je,Tt,tn),oe=Je,we=Tt,Me=tn)},setOp:function(Je,Tt,tn){(Ze!==Je||Ke!==Tt||mt!==tn)&&(r.stencilOp(Je,Tt,tn),Ze=Je,Ke=Tt,mt=tn)},setLocked:function(Je){D=Je},setClear:function(Je){wt!==Je&&(r.clearStencil(Je),wt=Je)},reset:function(){D=!1,re=null,oe=null,we=null,Me=null,Ze=null,Ke=null,mt=null,wt=null}}}const l=new i,h=new s,u=new a,f=new WeakMap,o=new WeakMap;let c={},d={},m=new WeakMap,g=[],_=null,p=!1,v=null,x=null,S=null,C=null,w=null,A=null,O=null,M=new Le(0,0,0),E=0,U=!1,z=null,N=null,P=null,L=null,I=null;const j=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,G=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(K)[1]),H=G>=1):K.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),H=G>=2);let Z=null,$={};const Y=r.getParameter(r.SCISSOR_BOX),J=r.getParameter(r.VIEWPORT),ae=new tt().fromArray(Y),pe=new tt().fromArray(J);function me(D,re,oe,we){const Me=new Uint8Array(4),Ze=r.createTexture();r.bindTexture(D,Ze),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ke=0;Ke<oe;Ke++)n&&(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)?r.texImage3D(re,0,r.RGBA,1,1,we,0,r.RGBA,r.UNSIGNED_BYTE,Me):r.texImage2D(re+Ke,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Me);return Ze}const Ie={};Ie[r.TEXTURE_2D]=me(r.TEXTURE_2D,r.TEXTURE_2D,1),Ie[r.TEXTURE_CUBE_MAP]=me(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[r.TEXTURE_2D_ARRAY]=me(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ie[r.TEXTURE_3D]=me(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),l.setClear(0,0,0,1),h.setClear(1),u.setClear(0),Ue(r.DEPTH_TEST),h.setFunc(er),Oe(!1),R(Wo),Ue(r.CULL_FACE),_e(Un);function Ue(D){c[D]!==!0&&(r.enable(D),c[D]=!0)}function Ee(D){c[D]!==!1&&(r.disable(D),c[D]=!1)}function We(D,re){return d[D]!==re?(r.bindFramebuffer(D,re),d[D]=re,n&&(D===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=re),D===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=re)),!0):!1}function k(D,re){let oe=g,we=!1;if(D)if(oe=m.get(re),oe===void 0&&(oe=[],m.set(re,oe)),D.isWebGLMultipleRenderTargets){const Me=D.texture;if(oe.length!==Me.length||oe[0]!==r.COLOR_ATTACHMENT0){for(let Ze=0,Ke=Me.length;Ze<Ke;Ze++)oe[Ze]=r.COLOR_ATTACHMENT0+Ze;oe.length=Me.length,we=!0}}else oe[0]!==r.COLOR_ATTACHMENT0&&(oe[0]=r.COLOR_ATTACHMENT0,we=!0);else oe[0]!==r.BACK&&(oe[0]=r.BACK,we=!0);we&&(t.isWebGL2?r.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Et(D){return _!==D?(r.useProgram(D),_=D,!0):!1}const ye={[$n]:r.FUNC_ADD,[Vc]:r.FUNC_SUBTRACT,[Wc]:r.FUNC_REVERSE_SUBTRACT};if(n)ye[Yo]=r.MIN,ye[jo]=r.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(ye[Yo]=D.MIN_EXT,ye[jo]=D.MAX_EXT)}const Ce={[Xc]:r.ZERO,[qc]:r.ONE,[Yc]:r.SRC_COLOR,[lo]:r.SRC_ALPHA,[Qc]:r.SRC_ALPHA_SATURATE,[Kc]:r.DST_COLOR,[$c]:r.DST_ALPHA,[jc]:r.ONE_MINUS_SRC_COLOR,[co]:r.ONE_MINUS_SRC_ALPHA,[Jc]:r.ONE_MINUS_DST_COLOR,[Zc]:r.ONE_MINUS_DST_ALPHA,[eh]:r.CONSTANT_COLOR,[th]:r.ONE_MINUS_CONSTANT_COLOR,[nh]:r.CONSTANT_ALPHA,[ih]:r.ONE_MINUS_CONSTANT_ALPHA};function _e(D,re,oe,we,Me,Ze,Ke,mt,wt,Je){if(D===Un){p===!0&&(Ee(r.BLEND),p=!1);return}if(p===!1&&(Ue(r.BLEND),p=!0),D!==kc){if(D!==v||Je!==U){if((x!==$n||w!==$n)&&(r.blendEquation(r.FUNC_ADD),x=$n,w=$n),Je)switch(D){case Di:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ao:r.blendFunc(r.ONE,r.ONE);break;case Xo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case qo:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Di:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ao:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Xo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case qo:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,C=null,A=null,O=null,M.set(0,0,0),E=0,v=D,U=Je}return}Me=Me||re,Ze=Ze||oe,Ke=Ke||we,(re!==x||Me!==w)&&(r.blendEquationSeparate(ye[re],ye[Me]),x=re,w=Me),(oe!==S||we!==C||Ze!==A||Ke!==O)&&(r.blendFuncSeparate(Ce[oe],Ce[we],Ce[Ze],Ce[Ke]),S=oe,C=we,A=Ze,O=Ke),(mt.equals(M)===!1||wt!==E)&&(r.blendColor(mt.r,mt.g,mt.b,wt),M.copy(mt),E=wt),v=D,U=!1}function nt(D,re){D.side===Kt?Ee(r.CULL_FACE):Ue(r.CULL_FACE);let oe=D.side===Dt;re&&(oe=!oe),Oe(oe),D.blending===Di&&D.transparent===!1?_e(Un):_e(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),h.setFunc(D.depthFunc),h.setTest(D.depthTest),h.setMask(D.depthWrite),l.setMask(D.colorWrite);const we=D.stencilWrite;u.setTest(we),we&&(u.setMask(D.stencilWriteMask),u.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),u.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),W(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ue(r.SAMPLE_ALPHA_TO_COVERAGE):Ee(r.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(D){z!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),z=D)}function R(D){D!==Hc?(Ue(r.CULL_FACE),D!==N&&(D===Wo?r.cullFace(r.BACK):D===Gc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ee(r.CULL_FACE),N=D}function b(D){D!==P&&(H&&r.lineWidth(D),P=D)}function W(D,re,oe){D?(Ue(r.POLYGON_OFFSET_FILL),(L!==re||I!==oe)&&(r.polygonOffset(re,oe),L=re,I=oe)):Ee(r.POLYGON_OFFSET_FILL)}function te(D){D?Ue(r.SCISSOR_TEST):Ee(r.SCISSOR_TEST)}function ee(D){D===void 0&&(D=r.TEXTURE0+j-1),Z!==D&&(r.activeTexture(D),Z=D)}function ne(D,re,oe){oe===void 0&&(Z===null?oe=r.TEXTURE0+j-1:oe=Z);let we=$[oe];we===void 0&&(we={type:void 0,texture:void 0},$[oe]=we),(we.type!==D||we.texture!==re)&&(Z!==oe&&(r.activeTexture(oe),Z=oe),r.bindTexture(D,re||Ie[D]),we.type=D,we.texture=re)}function ge(){const D=$[Z];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function le(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function de(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Be(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ye(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ve(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(D){ae.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),ae.copy(D))}function qe(D){pe.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),pe.copy(D))}function st(D,re){let oe=o.get(re);oe===void 0&&(oe=new WeakMap,o.set(re,oe));let we=oe.get(D);we===void 0&&(we=r.getUniformBlockIndex(re,D.name),oe.set(D,we))}function He(D,re){const we=o.get(re).get(D);f.get(re)!==we&&(r.uniformBlockBinding(re,we,D.__bindingPointIndex),f.set(re,we))}function ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},Z=null,$={},d={},m=new WeakMap,g=[],_=null,p=!1,v=null,x=null,S=null,C=null,w=null,A=null,O=null,M=new Le(0,0,0),E=0,U=!1,z=null,N=null,P=null,L=null,I=null,ae.set(0,0,r.canvas.width,r.canvas.height),pe.set(0,0,r.canvas.width,r.canvas.height),l.reset(),h.reset(),u.reset()}return{buffers:{color:l,depth:h,stencil:u},enable:Ue,disable:Ee,bindFramebuffer:We,drawBuffers:k,useProgram:Et,setBlending:_e,setMaterial:nt,setFlipSided:Oe,setCullFace:R,setLineWidth:b,setPolygonOffset:W,setScissorTest:te,activeTexture:ee,bindTexture:ne,unbindTexture:ge,compressedTexImage2D:le,compressedTexImage3D:de,texImage2D:xe,texImage3D:fe,updateUBOMapping:st,uniformBlockBinding:He,texStorage2D:Ve,texStorage3D:Re,texSubImage2D:be,texSubImage3D:Be,compressedTexSubImage2D:Q,compressedTexSubImage3D:Ye,scissor:Ne,viewport:qe,reset:ie}}function Zm(r,e,t,n,i,s,a){const l=i.isWebGL2,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new WeakMap;let o;const c=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,b){return d?new OffscreenCanvas(R,b):or("canvas")}function g(R,b,W,te){let ee=1;if((R.width>te||R.height>te)&&(ee=te/Math.max(R.width,R.height)),ee<1||b===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ne=b?rr:Math.floor,ge=ne(ee*R.width),le=ne(ee*R.height);o===void 0&&(o=m(ge,le));const de=W?m(ge,le):o;return de.width=ge,de.height=le,de.getContext("2d").drawImage(R,0,0,ge,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+ge+"x"+le+")."),de}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function _(R){return _o(R.width)&&_o(R.height)}function p(R){return l?!1:R.wrapS!==Jt||R.wrapT!==Jt||R.minFilter!==Ct&&R.minFilter!==It}function v(R,b){return R.generateMipmaps&&b&&R.minFilter!==Ct&&R.minFilter!==It}function x(R){r.generateMipmap(R)}function S(R,b,W,te,ee=!1){if(l===!1)return b;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ne=b;if(b===r.RED&&(W===r.FLOAT&&(ne=r.R32F),W===r.HALF_FLOAT&&(ne=r.R16F),W===r.UNSIGNED_BYTE&&(ne=r.R8)),b===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(ne=r.R8UI),W===r.UNSIGNED_SHORT&&(ne=r.R16UI),W===r.UNSIGNED_INT&&(ne=r.R32UI),W===r.BYTE&&(ne=r.R8I),W===r.SHORT&&(ne=r.R16I),W===r.INT&&(ne=r.R32I)),b===r.RG&&(W===r.FLOAT&&(ne=r.RG32F),W===r.HALF_FLOAT&&(ne=r.RG16F),W===r.UNSIGNED_BYTE&&(ne=r.RG8)),b===r.RGBA){const ge=ee?tr:$e.getTransfer(te);W===r.FLOAT&&(ne=r.RGBA32F),W===r.HALF_FLOAT&&(ne=r.RGBA16F),W===r.UNSIGNED_BYTE&&(ne=ge===et?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(ne=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(ne=r.RGB5_A1)}return(ne===r.R16F||ne===r.R32F||ne===r.RG16F||ne===r.RG32F||ne===r.RGBA16F||ne===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function C(R,b,W){return v(R,W)===!0||R.isFramebufferTexture&&R.minFilter!==Ct&&R.minFilter!==It?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){return R===Ct||R===$o||R===Sr?r.NEAREST:r.LINEAR}function A(R){const b=R.target;b.removeEventListener("dispose",A),M(b),b.isVideoTexture&&f.delete(b)}function O(R){const b=R.target;b.removeEventListener("dispose",O),U(b)}function M(R){const b=n.get(R);if(b.__webglInit===void 0)return;const W=R.source,te=c.get(W);if(te){const ee=te[b.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&E(R),Object.keys(te).length===0&&c.delete(W)}n.remove(R)}function E(R){const b=n.get(R);r.deleteTexture(b.__webglTexture);const W=R.source,te=c.get(W);delete te[b.__cacheKey],a.memory.textures--}function U(R){const b=R.texture,W=n.get(R),te=n.get(b);if(te.__webglTexture!==void 0&&(r.deleteTexture(te.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(W.__webglFramebuffer[ee]))for(let ne=0;ne<W.__webglFramebuffer[ee].length;ne++)r.deleteFramebuffer(W.__webglFramebuffer[ee][ne]);else r.deleteFramebuffer(W.__webglFramebuffer[ee]);W.__webglDepthbuffer&&r.deleteRenderbuffer(W.__webglDepthbuffer[ee])}else{if(Array.isArray(W.__webglFramebuffer))for(let ee=0;ee<W.__webglFramebuffer.length;ee++)r.deleteFramebuffer(W.__webglFramebuffer[ee]);else r.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&r.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&r.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ee=0;ee<W.__webglColorRenderbuffer.length;ee++)W.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(W.__webglColorRenderbuffer[ee]);W.__webglDepthRenderbuffer&&r.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ee=0,ne=b.length;ee<ne;ee++){const ge=n.get(b[ee]);ge.__webglTexture&&(r.deleteTexture(ge.__webglTexture),a.memory.textures--),n.remove(b[ee])}n.remove(b),n.remove(R)}let z=0;function N(){z=0}function P(){const R=z;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),z+=1,R}function L(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function I(R,b){const W=n.get(R);if(R.isVideoTexture&&nt(R),R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){const te=R.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(W,R,b);return}}t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+b)}function j(R,b){const W=n.get(R);if(R.version>0&&W.__version!==R.version){ae(W,R,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+b)}function H(R,b){const W=n.get(R);if(R.version>0&&W.__version!==R.version){ae(W,R,b);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+b)}function G(R,b){const W=n.get(R);if(R.version>0&&W.__version!==R.version){pe(W,R,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+b)}const K={[ls]:r.REPEAT,[Jt]:r.CLAMP_TO_EDGE,[fo]:r.MIRRORED_REPEAT},Z={[Ct]:r.NEAREST,[$o]:r.NEAREST_MIPMAP_NEAREST,[Sr]:r.NEAREST_MIPMAP_LINEAR,[It]:r.LINEAR,[vh]:r.LINEAR_MIPMAP_NEAREST,[cs]:r.LINEAR_MIPMAP_LINEAR},$={[Ph]:r.NEVER,[Fh]:r.ALWAYS,[Lh]:r.LESS,[Kl]:r.LEQUAL,[Ih]:r.EQUAL,[Nh]:r.GEQUAL,[Dh]:r.GREATER,[Uh]:r.NOTEQUAL};function Y(R,b,W){if(W?(r.texParameteri(R,r.TEXTURE_WRAP_S,K[b.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,K[b.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,K[b.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Z[b.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Z[b.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(b.wrapS!==Jt||b.wrapT!==Jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,w(b.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,w(b.minFilter)),b.minFilter!==Ct&&b.minFilter!==It&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,$[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===Ct||b.minFilter!==Sr&&b.minFilter!==cs||b.type===In&&e.has("OES_texture_float_linear")===!1||l===!1&&b.type===hs&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(r.texParameterf(R,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function J(R,b){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));const te=b.source;let ee=c.get(te);ee===void 0&&(ee={},c.set(te,ee));const ne=L(b);if(ne!==R.__cacheKey){ee[ne]===void 0&&(ee[ne]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ee[ne].usedTimes++;const ge=ee[R.__cacheKey];ge!==void 0&&(ee[R.__cacheKey].usedTimes--,ge.usedTimes===0&&E(b)),R.__cacheKey=ne,R.__webglTexture=ee[ne].texture}return W}function ae(R,b,W){let te=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(te=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(te=r.TEXTURE_3D);const ee=J(R,b),ne=b.source;t.bindTexture(te,R.__webglTexture,r.TEXTURE0+W);const ge=n.get(ne);if(ne.version!==ge.__version||ee===!0){t.activeTexture(r.TEXTURE0+W);const le=$e.getPrimaries($e.workingColorSpace),de=b.colorSpace===qt?null:$e.getPrimaries(b.colorSpace),be=b.colorSpace===qt||le===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Be=p(b)&&_(b.image)===!1;let Q=g(b.image,Be,!1,i.maxTextureSize);Q=Oe(b,Q);const Ye=_(Q)||l,Ve=s.convert(b.format,b.colorSpace);let Re=s.convert(b.type),xe=S(b.internalFormat,Ve,Re,b.colorSpace,b.isVideoTexture);Y(te,b,Ye);let fe;const Ne=b.mipmaps,qe=l&&b.isVideoTexture!==!0&&xe!==$l,st=ge.__version===void 0||ee===!0,He=C(b,Q,Ye);if(b.isDepthTexture)xe=r.DEPTH_COMPONENT,l?b.type===In?xe=r.DEPTH_COMPONENT32F:b.type===Ln?xe=r.DEPTH_COMPONENT24:b.type===Qn?xe=r.DEPTH24_STENCIL8:xe=r.DEPTH_COMPONENT16:b.type===In&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===ei&&xe===r.DEPTH_COMPONENT&&b.type!==Eo&&b.type!==Ln&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Ln,Re=s.convert(b.type)),b.format===zi&&xe===r.DEPTH_COMPONENT&&(xe=r.DEPTH_STENCIL,b.type!==Qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Qn,Re=s.convert(b.type))),st&&(qe?t.texStorage2D(r.TEXTURE_2D,1,xe,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,xe,Q.width,Q.height,0,Ve,Re,null));else if(b.isDataTexture)if(Ne.length>0&&Ye){qe&&st&&t.texStorage2D(r.TEXTURE_2D,He,xe,Ne[0].width,Ne[0].height);for(let ie=0,D=Ne.length;ie<D;ie++)fe=Ne[ie],qe?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,fe.width,fe.height,Ve,Re,fe.data):t.texImage2D(r.TEXTURE_2D,ie,xe,fe.width,fe.height,0,Ve,Re,fe.data);b.generateMipmaps=!1}else qe?(st&&t.texStorage2D(r.TEXTURE_2D,He,xe,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,Ve,Re,Q.data)):t.texImage2D(r.TEXTURE_2D,0,xe,Q.width,Q.height,0,Ve,Re,Q.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){qe&&st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,He,xe,Ne[0].width,Ne[0].height,Q.depth);for(let ie=0,D=Ne.length;ie<D;ie++)fe=Ne[ie],b.format!==Qt?Ve!==null?qe?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,Q.depth,Ve,fe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ie,xe,fe.width,fe.height,Q.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,Q.depth,Ve,Re,fe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ie,xe,fe.width,fe.height,Q.depth,0,Ve,Re,fe.data)}else{qe&&st&&t.texStorage2D(r.TEXTURE_2D,He,xe,Ne[0].width,Ne[0].height);for(let ie=0,D=Ne.length;ie<D;ie++)fe=Ne[ie],b.format!==Qt?Ve!==null?qe?t.compressedTexSubImage2D(r.TEXTURE_2D,ie,0,0,fe.width,fe.height,Ve,fe.data):t.compressedTexImage2D(r.TEXTURE_2D,ie,xe,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,fe.width,fe.height,Ve,Re,fe.data):t.texImage2D(r.TEXTURE_2D,ie,xe,fe.width,fe.height,0,Ve,Re,fe.data)}else if(b.isDataArrayTexture)qe?(st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,He,xe,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Ve,Re,Q.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,xe,Q.width,Q.height,Q.depth,0,Ve,Re,Q.data);else if(b.isData3DTexture)qe?(st&&t.texStorage3D(r.TEXTURE_3D,He,xe,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Ve,Re,Q.data)):t.texImage3D(r.TEXTURE_3D,0,xe,Q.width,Q.height,Q.depth,0,Ve,Re,Q.data);else if(b.isFramebufferTexture){if(st)if(qe)t.texStorage2D(r.TEXTURE_2D,He,xe,Q.width,Q.height);else{let ie=Q.width,D=Q.height;for(let re=0;re<He;re++)t.texImage2D(r.TEXTURE_2D,re,xe,ie,D,0,Ve,Re,null),ie>>=1,D>>=1}}else if(Ne.length>0&&Ye){qe&&st&&t.texStorage2D(r.TEXTURE_2D,He,xe,Ne[0].width,Ne[0].height);for(let ie=0,D=Ne.length;ie<D;ie++)fe=Ne[ie],qe?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,Ve,Re,fe):t.texImage2D(r.TEXTURE_2D,ie,xe,Ve,Re,fe);b.generateMipmaps=!1}else qe?(st&&t.texStorage2D(r.TEXTURE_2D,He,xe,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ve,Re,Q)):t.texImage2D(r.TEXTURE_2D,0,xe,Ve,Re,Q);v(b,Ye)&&x(te),ge.__version=ne.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function pe(R,b,W){if(b.image.length!==6)return;const te=J(R,b),ee=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+W);const ne=n.get(ee);if(ee.version!==ne.__version||te===!0){t.activeTexture(r.TEXTURE0+W);const ge=$e.getPrimaries($e.workingColorSpace),le=b.colorSpace===qt?null:$e.getPrimaries(b.colorSpace),de=b.colorSpace===qt||ge===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const be=b.isCompressedTexture||b.image[0].isCompressedTexture,Be=b.image[0]&&b.image[0].isDataTexture,Q=[];for(let ie=0;ie<6;ie++)!be&&!Be?Q[ie]=g(b.image[ie],!1,!0,i.maxCubemapSize):Q[ie]=Be?b.image[ie].image:b.image[ie],Q[ie]=Oe(b,Q[ie]);const Ye=Q[0],Ve=_(Ye)||l,Re=s.convert(b.format,b.colorSpace),xe=s.convert(b.type),fe=S(b.internalFormat,Re,xe,b.colorSpace),Ne=l&&b.isVideoTexture!==!0,qe=ne.__version===void 0||te===!0;let st=C(b,Ye,Ve);Y(r.TEXTURE_CUBE_MAP,b,Ve);let He;if(be){Ne&&qe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,st,fe,Ye.width,Ye.height);for(let ie=0;ie<6;ie++){He=Q[ie].mipmaps;for(let D=0;D<He.length;D++){const re=He[D];b.format!==Qt?Re!==null?Ne?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D,0,0,re.width,re.height,Re,re.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D,fe,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D,0,0,re.width,re.height,Re,xe,re.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D,fe,re.width,re.height,0,Re,xe,re.data)}}}else{He=b.mipmaps,Ne&&qe&&(He.length>0&&st++,t.texStorage2D(r.TEXTURE_CUBE_MAP,st,fe,Q[0].width,Q[0].height));for(let ie=0;ie<6;ie++)if(Be){Ne?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Q[ie].width,Q[ie].height,Re,xe,Q[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Q[ie].width,Q[ie].height,0,Re,xe,Q[ie].data);for(let D=0;D<He.length;D++){const oe=He[D].image[ie].image;Ne?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D+1,0,0,oe.width,oe.height,Re,xe,oe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D+1,fe,oe.width,oe.height,0,Re,xe,oe.data)}}else{Ne?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Re,xe,Q[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Re,xe,Q[ie]);for(let D=0;D<He.length;D++){const re=He[D];Ne?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D+1,0,0,Re,xe,re.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,D+1,fe,Re,xe,re.image[ie])}}}v(b,Ve)&&x(r.TEXTURE_CUBE_MAP),ne.__version=ee.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function me(R,b,W,te,ee,ne){const ge=s.convert(W.format,W.colorSpace),le=s.convert(W.type),de=S(W.internalFormat,ge,le,W.colorSpace);if(!n.get(b).__hasExternalTextures){const Be=Math.max(1,b.width>>ne),Q=Math.max(1,b.height>>ne);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,ne,de,Be,Q,b.depth,0,ge,le,null):t.texImage2D(ee,ne,de,Be,Q,0,ge,le,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),_e(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,ee,n.get(W).__webglTexture,0,Ce(b)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,te,ee,n.get(W).__webglTexture,ne),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(R,b,W){if(r.bindRenderbuffer(r.RENDERBUFFER,R),b.depthBuffer&&!b.stencilBuffer){let te=l===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(W||_e(b)){const ee=b.depthTexture;ee&&ee.isDepthTexture&&(ee.type===In?te=r.DEPTH_COMPONENT32F:ee.type===Ln&&(te=r.DEPTH_COMPONENT24));const ne=Ce(b);_e(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,te,b.width,b.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,te,b.width,b.height)}else r.renderbufferStorage(r.RENDERBUFFER,te,b.width,b.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(b.depthBuffer&&b.stencilBuffer){const te=Ce(b);W&&_e(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,r.DEPTH24_STENCIL8,b.width,b.height):_e(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,r.DEPTH24_STENCIL8,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const te=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ee=0;ee<te.length;ee++){const ne=te[ee],ge=s.convert(ne.format,ne.colorSpace),le=s.convert(ne.type),de=S(ne.internalFormat,ge,le,ne.colorSpace),be=Ce(b);W&&_e(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,be,de,b.width,b.height):_e(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,be,de,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,de,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ue(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I(b.depthTexture,0);const te=n.get(b.depthTexture).__webglTexture,ee=Ce(b);if(b.depthTexture.format===ei)_e(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0);else if(b.depthTexture.format===zi)_e(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ee(R){const b=n.get(R),W=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ue(b.__webglFramebuffer,R)}else if(W){b.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[te]),b.__webglDepthbuffer[te]=r.createRenderbuffer(),Ie(b.__webglDepthbuffer[te],R,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=r.createRenderbuffer(),Ie(b.__webglDepthbuffer,R,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function We(R,b,W){const te=n.get(R);b!==void 0&&me(te.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&Ee(R)}function k(R){const b=R.texture,W=n.get(R),te=n.get(b);R.addEventListener("dispose",O),R.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture()),te.__version=b.version,a.memory.textures++);const ee=R.isWebGLCubeRenderTarget===!0,ne=R.isWebGLMultipleRenderTargets===!0,ge=_(R)||l;if(ee){W.__webglFramebuffer=[];for(let le=0;le<6;le++)if(l&&b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer[le]=[];for(let de=0;de<b.mipmaps.length;de++)W.__webglFramebuffer[le][de]=r.createFramebuffer()}else W.__webglFramebuffer[le]=r.createFramebuffer()}else{if(l&&b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer=[];for(let le=0;le<b.mipmaps.length;le++)W.__webglFramebuffer[le]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(ne)if(i.drawBuffers){const le=R.texture;for(let de=0,be=le.length;de<be;de++){const Be=n.get(le[de]);Be.__webglTexture===void 0&&(Be.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(l&&R.samples>0&&_e(R)===!1){const le=ne?b:[b];W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let de=0;de<le.length;de++){const be=le[de];W.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[de]);const Be=s.convert(be.format,be.colorSpace),Q=s.convert(be.type),Ye=S(be.internalFormat,Be,Q,be.colorSpace,R.isXRRenderTarget===!0),Ve=Ce(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ve,Ye,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,W.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),Ie(W.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ee){t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture),Y(r.TEXTURE_CUBE_MAP,b,ge);for(let le=0;le<6;le++)if(l&&b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)me(W.__webglFramebuffer[le][de],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,de);else me(W.__webglFramebuffer[le],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);v(b,ge)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const le=R.texture;for(let de=0,be=le.length;de<be;de++){const Be=le[de],Q=n.get(Be);t.bindTexture(r.TEXTURE_2D,Q.__webglTexture),Y(r.TEXTURE_2D,Be,ge),me(W.__webglFramebuffer,R,Be,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,0),v(Be,ge)&&x(r.TEXTURE_2D)}t.unbindTexture()}else{let le=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(l?le=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,te.__webglTexture),Y(le,b,ge),l&&b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)me(W.__webglFramebuffer[de],R,b,r.COLOR_ATTACHMENT0,le,de);else me(W.__webglFramebuffer,R,b,r.COLOR_ATTACHMENT0,le,0);v(b,ge)&&x(le),t.unbindTexture()}R.depthBuffer&&Ee(R)}function Et(R){const b=_(R)||l,W=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let te=0,ee=W.length;te<ee;te++){const ne=W[te];if(v(ne,b)){const ge=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,le=n.get(ne).__webglTexture;t.bindTexture(ge,le),x(ge),t.unbindTexture()}}}function ye(R){if(l&&R.samples>0&&_e(R)===!1){const b=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],W=R.width,te=R.height;let ee=r.COLOR_BUFFER_BIT;const ne=[],ge=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,le=n.get(R),de=R.isWebGLMultipleRenderTargets===!0;if(de)for(let be=0;be<b.length;be++)t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let be=0;be<b.length;be++){ne.push(r.COLOR_ATTACHMENT0+be),R.depthBuffer&&ne.push(ge);const Be=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Be===!1&&(R.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),de&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,le.__webglColorRenderbuffer[be]),Be===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ge]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ge])),de){const Q=n.get(b[be]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,W,te,0,0,W,te,ee,r.NEAREST),u&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let be=0;be<b.length;be++){t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.RENDERBUFFER,le.__webglColorRenderbuffer[be]);const Be=n.get(b[be]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.TEXTURE_2D,Be,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Ce(R){return Math.min(i.maxSamples,R.samples)}function _e(R){const b=n.get(R);return l&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function nt(R){const b=a.render.frame;f.get(R)!==b&&(f.set(R,b),R.update())}function Oe(R,b){const W=R.colorSpace,te=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===mo||W!==bn&&W!==qt&&($e.getTransfer(W)===et?l===!1?e.has("EXT_sRGB")===!0&&te===Qt?(R.format=mo,R.minFilter=It,R.generateMipmaps=!1):b=Ql.sRGBToLinear(b):(te!==Qt||ee!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),b}this.allocateTextureUnit=P,this.resetTextureUnits=N,this.setTexture2D=I,this.setTexture2DArray=j,this.setTexture3D=H,this.setTextureCube=G,this.rebindTextures=We,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=me,this.useMultisampledRTT=_e}function Km(r,e,t){const n=t.isWebGL2;function i(s,a=qt){let l;const h=$e.getTransfer(a);if(s===Fn)return r.UNSIGNED_BYTE;if(s===Wl)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Xl)return r.UNSIGNED_SHORT_5_5_5_1;if(s===xh)return r.BYTE;if(s===yh)return r.SHORT;if(s===Eo)return r.UNSIGNED_SHORT;if(s===Vl)return r.INT;if(s===Ln)return r.UNSIGNED_INT;if(s===In)return r.FLOAT;if(s===hs)return n?r.HALF_FLOAT:(l=e.get("OES_texture_half_float"),l!==null?l.HALF_FLOAT_OES:null);if(s===Mh)return r.ALPHA;if(s===Qt)return r.RGBA;if(s===Sh)return r.LUMINANCE;if(s===bh)return r.LUMINANCE_ALPHA;if(s===ei)return r.DEPTH_COMPONENT;if(s===zi)return r.DEPTH_STENCIL;if(s===mo)return l=e.get("EXT_sRGB"),l!==null?l.SRGB_ALPHA_EXT:null;if(s===Eh)return r.RED;if(s===ql)return r.RED_INTEGER;if(s===wh)return r.RG;if(s===Yl)return r.RG_INTEGER;if(s===jl)return r.RGBA_INTEGER;if(s===br||s===Er||s===wr||s===Tr)if(h===et)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(s===br)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Er)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===wr)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Tr)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(s===br)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Er)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===wr)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Tr)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Zo||s===Ko||s===Jo||s===Qo)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(s===Zo)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ko)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Jo)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Qo)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===$l)return l=e.get("WEBGL_compressed_texture_etc1"),l!==null?l.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ea||s===ta)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(s===ea)return h===et?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(s===ta)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===na||s===ia||s===sa||s===ra||s===oa||s===aa||s===la||s===ca||s===ha||s===ua||s===da||s===fa||s===pa||s===ma)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(s===na)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ia)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===sa)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ra)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===oa)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===aa)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===la)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ca)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ha)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ua)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===da)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===fa)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===pa)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ma)return h===et?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ar||s===_a||s===ga)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(s===Ar)return h===et?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===_a)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ga)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Th||s===va||s===xa||s===ya)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(s===Ar)return l.COMPRESSED_RED_RGTC1_EXT;if(s===va)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===xa)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ya)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Qn?n?r.UNSIGNED_INT_24_8:(l=e.get("WEBGL_depth_texture"),l!==null?l.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Jm extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Jn extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class Zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const l=this._targetRay,h=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const g of e.hand.values()){const _=t.getJointPose(g,n),p=this._getHandJoint(u,g);_!==null&&(p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius),p.visible=_!==null}const f=u.joints["index-finger-tip"],o=u.joints["thumb-tip"],c=f.position.distanceTo(o.position),d=.02,m=.005;u.inputState.pinching&&c>d+m?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&c<=d-m&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return l!==null&&(l.visible=i!==null),h!==null&&(h.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class e_ extends Gi{constructor(e,t){super();const n=this;let i=null,s=1,a=null,l="local-floor",h=1,u=null,f=null,o=null,c=null,d=null,m=null;const g=t.getContextAttributes();let _=null,p=null;const v=[],x=[],S=new Ae;let C=null;const w=new zt;w.layers.enable(1),w.viewport=new tt;const A=new zt;A.layers.enable(2),A.viewport=new tt;const O=[w,A],M=new Jm;M.layers.enable(1),M.layers.enable(2);let E=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let J=v[Y];return J===void 0&&(J=new Zr,v[Y]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Y){let J=v[Y];return J===void 0&&(J=new Zr,v[Y]=J),J.getGripSpace()},this.getHand=function(Y){let J=v[Y];return J===void 0&&(J=new Zr,v[Y]=J),J.getHandSpace()};function z(Y){const J=x.indexOf(Y.inputSource);if(J===-1)return;const ae=v[J];ae!==void 0&&(ae.update(Y.inputSource,Y.frame,u||a),ae.dispatchEvent({type:Y.type,data:Y.inputSource}))}function N(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",P);for(let Y=0;Y<v.length;Y++){const J=x[Y];J!==null&&(x[Y]=null,v[Y].disconnect(J))}E=null,U=null,e.setRenderTarget(_),d=null,c=null,o=null,i=null,p=null,$.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){l=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(Y){u=Y},this.getBaseLayer=function(){return c!==null?c:d},this.getBinding=function(){return o},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",N),i.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,J),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new ii(d.framebufferWidth,d.framebufferHeight,{format:Qt,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let J=null,ae=null,pe=null;g.depth&&(pe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=g.stencil?zi:ei,ae=g.stencil?Qn:Ln);const me={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};o=new XRWebGLBinding(i,t),c=o.createProjectionLayer(me),i.updateRenderState({layers:[c]}),e.setPixelRatio(1),e.setSize(c.textureWidth,c.textureHeight,!1),p=new ii(c.textureWidth,c.textureHeight,{format:Qt,type:Fn,depthTexture:new dc(c.textureWidth,c.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Ie=e.properties.get(p);Ie.__ignoreDepthValues=c.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(h),u=null,a=await i.requestReferenceSpace(l),$.setContext(i),$.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(Y){for(let J=0;J<Y.removed.length;J++){const ae=Y.removed[J],pe=x.indexOf(ae);pe>=0&&(x[pe]=null,v[pe].disconnect(ae))}for(let J=0;J<Y.added.length;J++){const ae=Y.added[J];let pe=x.indexOf(ae);if(pe===-1){for(let Ie=0;Ie<v.length;Ie++)if(Ie>=x.length){x.push(ae),pe=Ie;break}else if(x[Ie]===null){x[Ie]=ae,pe=Ie;break}if(pe===-1)break}const me=v[pe];me&&me.connect(ae)}}const L=new F,I=new F;function j(Y,J,ae){L.setFromMatrixPosition(J.matrixWorld),I.setFromMatrixPosition(ae.matrixWorld);const pe=L.distanceTo(I),me=J.projectionMatrix.elements,Ie=ae.projectionMatrix.elements,Ue=me[14]/(me[10]-1),Ee=me[14]/(me[10]+1),We=(me[9]+1)/me[5],k=(me[9]-1)/me[5],Et=(me[8]-1)/me[0],ye=(Ie[8]+1)/Ie[0],Ce=Ue*Et,_e=Ue*ye,nt=pe/(-Et+ye),Oe=nt*-Et;J.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Oe),Y.translateZ(nt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const R=Ue+nt,b=Ee+nt,W=Ce-Oe,te=_e+(pe-Oe),ee=We*Ee/b*R,ne=k*Ee/b*R;Y.projectionMatrix.makePerspective(W,te,ee,ne,R,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function H(Y,J){J===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(J.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;M.near=A.near=w.near=Y.near,M.far=A.far=w.far=Y.far,(E!==M.near||U!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,U=M.far);const J=Y.parent,ae=M.cameras;H(M,J);for(let pe=0;pe<ae.length;pe++)H(ae[pe],J);ae.length===2?j(M,w,A):M.projectionMatrix.copy(w.projectionMatrix),G(Y,M,J)};function G(Y,J,ae){ae===null?Y.matrix.copy(J.matrixWorld):(Y.matrix.copy(ae.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(J.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=us*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(c===null&&d===null))return h},this.setFoveation=function(Y){h=Y,c!==null&&(c.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)};let K=null;function Z(Y,J){if(f=J.getViewerPose(u||a),m=J,f!==null){const ae=f.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let pe=!1;ae.length!==M.cameras.length&&(M.cameras.length=0,pe=!0);for(let me=0;me<ae.length;me++){const Ie=ae[me];let Ue=null;if(d!==null)Ue=d.getViewport(Ie);else{const We=o.getViewSubImage(c,Ie);Ue=We.viewport,me===0&&(e.setRenderTargetTextures(p,We.colorTexture,c.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(p))}let Ee=O[me];Ee===void 0&&(Ee=new zt,Ee.layers.enable(me),Ee.viewport=new tt,O[me]=Ee),Ee.matrix.fromArray(Ie.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Ie.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),me===0&&(M.matrix.copy(Ee.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),pe===!0&&M.cameras.push(Ee)}}for(let ae=0;ae<v.length;ae++){const pe=x[ae],me=v[ae];pe!==null&&me!==void 0&&me.update(pe,J,u||a)}K&&K(Y,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),m=null}const $=new hc;$.setAnimationLoop(Z),this.setAnimationLoop=function(Y){K=Y},this.dispose=function(){}}}function t_(r,e){function t(_,p){_.matrixAutoUpdate===!0&&_.updateMatrix(),p.value.copy(_.matrix)}function n(_,p){p.color.getRGB(_.fogColor.value,ac(r)),p.isFog?(_.fogNear.value=p.near,_.fogFar.value=p.far):p.isFogExp2&&(_.fogDensity.value=p.density)}function i(_,p,v,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(_,p):p.isMeshToonMaterial?(s(_,p),o(_,p)):p.isMeshPhongMaterial?(s(_,p),f(_,p)):p.isMeshStandardMaterial?(s(_,p),c(_,p),p.isMeshPhysicalMaterial&&d(_,p,S)):p.isMeshMatcapMaterial?(s(_,p),m(_,p)):p.isMeshDepthMaterial?s(_,p):p.isMeshDistanceMaterial?(s(_,p),g(_,p)):p.isMeshNormalMaterial?s(_,p):p.isLineBasicMaterial?(a(_,p),p.isLineDashedMaterial&&l(_,p)):p.isPointsMaterial?h(_,p,v,x):p.isSpriteMaterial?u(_,p):p.isShadowMaterial?(_.color.value.copy(p.color),_.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(_,p){_.opacity.value=p.opacity,p.color&&_.diffuse.value.copy(p.color),p.emissive&&_.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.bumpMap&&(_.bumpMap.value=p.bumpMap,t(p.bumpMap,_.bumpMapTransform),_.bumpScale.value=p.bumpScale,p.side===Dt&&(_.bumpScale.value*=-1)),p.normalMap&&(_.normalMap.value=p.normalMap,t(p.normalMap,_.normalMapTransform),_.normalScale.value.copy(p.normalScale),p.side===Dt&&_.normalScale.value.negate()),p.displacementMap&&(_.displacementMap.value=p.displacementMap,t(p.displacementMap,_.displacementMapTransform),_.displacementScale.value=p.displacementScale,_.displacementBias.value=p.displacementBias),p.emissiveMap&&(_.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,_.emissiveMapTransform)),p.specularMap&&(_.specularMap.value=p.specularMap,t(p.specularMap,_.specularMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(_.envMap.value=v,_.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=p.reflectivity,_.ior.value=p.ior,_.refractionRatio.value=p.refractionRatio),p.lightMap){_.lightMap.value=p.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,_.lightMapTransform)}p.aoMap&&(_.aoMap.value=p.aoMap,_.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,_.aoMapTransform))}function a(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform))}function l(_,p){_.dashSize.value=p.dashSize,_.totalSize.value=p.dashSize+p.gapSize,_.scale.value=p.scale}function h(_,p,v,x){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.size.value=p.size*v,_.scale.value=x*.5,p.map&&(_.map.value=p.map,t(p.map,_.uvTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function u(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.rotation.value=p.rotation,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function f(_,p){_.specular.value.copy(p.specular),_.shininess.value=Math.max(p.shininess,1e-4)}function o(_,p){p.gradientMap&&(_.gradientMap.value=p.gradientMap)}function c(_,p){_.metalness.value=p.metalness,p.metalnessMap&&(_.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,_.metalnessMapTransform)),_.roughness.value=p.roughness,p.roughnessMap&&(_.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,_.roughnessMapTransform)),e.get(p).envMap&&(_.envMapIntensity.value=p.envMapIntensity)}function d(_,p,v){_.ior.value=p.ior,p.sheen>0&&(_.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),_.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(_.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,_.sheenColorMapTransform)),p.sheenRoughnessMap&&(_.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,_.sheenRoughnessMapTransform))),p.clearcoat>0&&(_.clearcoat.value=p.clearcoat,_.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(_.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,_.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(_.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dt&&_.clearcoatNormalScale.value.negate())),p.iridescence>0&&(_.iridescence.value=p.iridescence,_.iridescenceIOR.value=p.iridescenceIOR,_.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(_.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,_.iridescenceMapTransform)),p.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),p.transmission>0&&(_.transmission.value=p.transmission,_.transmissionSamplerMap.value=v.texture,_.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(_.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,_.transmissionMapTransform)),_.thickness.value=p.thickness,p.thicknessMap&&(_.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=p.attenuationDistance,_.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(_.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(_.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=p.specularIntensity,_.specularColor.value.copy(p.specularColor),p.specularColorMap&&(_.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,_.specularColorMapTransform)),p.specularIntensityMap&&(_.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,_.specularIntensityMapTransform))}function m(_,p){p.matcap&&(_.matcap.value=p.matcap)}function g(_,p){const v=e.get(p).light;_.referencePosition.value.setFromMatrixPosition(v.matrixWorld),_.nearDistance.value=v.shadow.camera.near,_.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function n_(r,e,t,n){let i={},s={},a=[];const l=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function h(v,x){const S=x.program;n.uniformBlockBinding(v,S)}function u(v,x){let S=i[v.id];S===void 0&&(m(v),S=f(v),i[v.id]=S,v.addEventListener("dispose",_));const C=x.program;n.updateUBOMapping(v,C);const w=e.render.frame;s[v.id]!==w&&(c(v),s[v.id]=w)}function f(v){const x=o();v.__bindingPointIndex=x;const S=r.createBuffer(),C=v.__size,w=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,C,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,S),S}function o(){for(let v=0;v<l;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(v){const x=i[v.id],S=v.uniforms,C=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let w=0,A=S.length;w<A;w++){const O=Array.isArray(S[w])?S[w]:[S[w]];for(let M=0,E=O.length;M<E;M++){const U=O[M];if(d(U,w,M,C)===!0){const z=U.__offset,N=Array.isArray(U.value)?U.value:[U.value];let P=0;for(let L=0;L<N.length;L++){const I=N[L],j=g(I);typeof I=="number"||typeof I=="boolean"?(U.__data[0]=I,r.bufferSubData(r.UNIFORM_BUFFER,z+P,U.__data)):I.isMatrix3?(U.__data[0]=I.elements[0],U.__data[1]=I.elements[1],U.__data[2]=I.elements[2],U.__data[3]=0,U.__data[4]=I.elements[3],U.__data[5]=I.elements[4],U.__data[6]=I.elements[5],U.__data[7]=0,U.__data[8]=I.elements[6],U.__data[9]=I.elements[7],U.__data[10]=I.elements[8],U.__data[11]=0):(I.toArray(U.__data,P),P+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,z,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,x,S,C){const w=v.value,A=x+"_"+S;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const O=C[A];if(typeof w=="number"||typeof w=="boolean"){if(O!==w)return C[A]=w,!0}else if(O.equals(w)===!1)return O.copy(w),!0}return!1}function m(v){const x=v.uniforms;let S=0;const C=16;for(let A=0,O=x.length;A<O;A++){const M=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,U=M.length;E<U;E++){const z=M[E],N=Array.isArray(z.value)?z.value:[z.value];for(let P=0,L=N.length;P<L;P++){const I=N[P],j=g(I),H=S%C;H!==0&&C-H<j.boundary&&(S+=C-H),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=S,S+=j.storage}}}const w=S%C;return w>0&&(S+=C-w),v.__size=S,v.__cache={},this}function g(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function _(v){const x=v.target;x.removeEventListener("dispose",_);const S=a.indexOf(x.__bindingPointIndex);a.splice(S,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:h,update:u,dispose:p}}class vc{constructor(e={}){const{canvas:t=Kh(),context:n=null,depth:i=!0,stencil:s=!0,alpha:a=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:o=!1}=e;this.isWebGLRenderer=!0;let c;n!==null?c=n.getContextAttributes().alpha:c=a;const d=new Uint32Array(4),m=new Int32Array(4);let g=null,_=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vt,this._useLegacyLights=!1,this.toneMapping=Nn,this.toneMappingExposure=1;const x=this;let S=!1,C=0,w=0,A=null,O=-1,M=null;const E=new tt,U=new tt;let z=null;const N=new Le(0);let P=0,L=t.width,I=t.height,j=1,H=null,G=null;const K=new tt(0,0,L,I),Z=new tt(0,0,L,I);let $=!1;const Y=new Ro;let J=!1,ae=!1,pe=null;const me=new ot,Ie=new Ae,Ue=new F,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return A===null?j:1}let k=n;function Et(T,B){for(let X=0;X<T.length;X++){const q=T[X],V=t.getContext(q,B);if(V!==null)return V}return null}try{const T={alpha:!0,depth:i,stencil:s,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:o};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${So}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",re,!1),k===null){const B=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&B.shift(),k=Et(B,T),k===null)throw Et(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ye,Ce,_e,nt,Oe,R,b,W,te,ee,ne,ge,le,de,be,Be,Q,Ye,Ve,Re,xe,fe,Ne,qe;function st(){ye=new dp(k),Ce=new op(k,ye,e),ye.init(Ce),fe=new Km(k,ye,Ce),_e=new $m(k,ye,Ce),nt=new mp(k),Oe=new Nm,R=new Zm(k,ye,_e,Oe,Ce,fe,nt),b=new lp(x),W=new up(x),te=new Su(k,Ce),Ne=new sp(k,ye,te,Ce),ee=new fp(k,te,nt,Ne),ne=new xp(k,ee,te,nt),Ve=new vp(k,Ce,R),Be=new ap(Oe),ge=new Um(x,b,W,ye,Ce,Ne,Be),le=new t_(x,Oe),de=new Om,be=new Vm(ye,Ce),Ye=new ip(x,b,W,_e,ne,c,h),Q=new jm(x,ne,Ce),qe=new n_(k,nt,Ce,_e),Re=new rp(k,ye,nt,Ce),xe=new pp(k,ye,nt,Ce),nt.programs=ge.programs,x.capabilities=Ce,x.extensions=ye,x.properties=Oe,x.renderLists=de,x.shadowMap=Q,x.state=_e,x.info=nt}st();const He=new e_(x,k);this.xr=He,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=ye.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ye.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(T){T!==void 0&&(j=T,this.setSize(L,I,!1))},this.getSize=function(T){return T.set(L,I)},this.setSize=function(T,B,X=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=T,I=B,t.width=Math.floor(T*j),t.height=Math.floor(B*j),X===!0&&(t.style.width=T+"px",t.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(L*j,I*j).floor()},this.setDrawingBufferSize=function(T,B,X){L=T,I=B,j=X,t.width=Math.floor(T*X),t.height=Math.floor(B*X),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(E)},this.getViewport=function(T){return T.copy(K)},this.setViewport=function(T,B,X,q){T.isVector4?K.set(T.x,T.y,T.z,T.w):K.set(T,B,X,q),_e.viewport(E.copy(K).multiplyScalar(j).floor())},this.getScissor=function(T){return T.copy(Z)},this.setScissor=function(T,B,X,q){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,B,X,q),_e.scissor(U.copy(Z).multiplyScalar(j).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(T){_e.setScissorTest($=T)},this.setOpaqueSort=function(T){H=T},this.setTransparentSort=function(T){G=T},this.getClearColor=function(T){return T.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(T=!0,B=!0,X=!0){let q=0;if(T){let V=!1;if(A!==null){const he=A.texture.format;V=he===jl||he===Yl||he===ql}if(V){const he=A.texture.type,ve=he===Fn||he===Ln||he===Eo||he===Qn||he===Wl||he===Xl,Se=Ye.getClearColor(),Te=Ye.getClearAlpha(),ze=Se.r,Pe=Se.g,De=Se.b;ve?(d[0]=ze,d[1]=Pe,d[2]=De,d[3]=Te,k.clearBufferuiv(k.COLOR,0,d)):(m[0]=ze,m[1]=Pe,m[2]=De,m[3]=Te,k.clearBufferiv(k.COLOR,0,m))}else q|=k.COLOR_BUFFER_BIT}B&&(q|=k.DEPTH_BUFFER_BIT),X&&(q|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",re,!1),de.dispose(),be.dispose(),Oe.dispose(),b.dispose(),W.dispose(),ne.dispose(),Ne.dispose(),qe.dispose(),ge.dispose(),He.dispose(),He.removeEventListener("sessionstart",wt),He.removeEventListener("sessionend",Je),pe&&(pe.dispose(),pe=null),Tt.stop()};function ie(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const T=nt.autoReset,B=Q.enabled,X=Q.autoUpdate,q=Q.needsUpdate,V=Q.type;st(),nt.autoReset=T,Q.enabled=B,Q.autoUpdate=X,Q.needsUpdate=q,Q.type=V}function re(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function oe(T){const B=T.target;B.removeEventListener("dispose",oe),we(B)}function we(T){Me(T),Oe.remove(T)}function Me(T){const B=Oe.get(T).programs;B!==void 0&&(B.forEach(function(X){ge.releaseProgram(X)}),T.isShaderMaterial&&ge.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,X,q,V,he){B===null&&(B=Ee);const ve=V.isMesh&&V.matrixWorld.determinant()<0,Se=Uc(T,B,X,q,V);_e.setMaterial(q,ve);let Te=X.index,ze=1;if(q.wireframe===!0){if(Te=ee.getWireframeAttribute(X),Te===void 0)return;ze=2}const Pe=X.drawRange,De=X.attributes.position;let at=Pe.start*ze,Ft=(Pe.start+Pe.count)*ze;he!==null&&(at=Math.max(at,he.start*ze),Ft=Math.min(Ft,(he.start+he.count)*ze)),Te!==null?(at=Math.max(at,0),Ft=Math.min(Ft,Te.count)):De!=null&&(at=Math.max(at,0),Ft=Math.min(Ft,De.count));const _t=Ft-at;if(_t<0||_t===1/0)return;Ne.setup(V,q,Se,X,Te);let ln,it=Re;if(Te!==null&&(ln=te.get(Te),it=xe,it.setIndex(ln)),V.isMesh)q.wireframe===!0?(_e.setLineWidth(q.wireframeLinewidth*We()),it.setMode(k.LINES)):it.setMode(k.TRIANGLES);else if(V.isLine){let Ge=q.linewidth;Ge===void 0&&(Ge=1),_e.setLineWidth(Ge*We()),V.isLineSegments?it.setMode(k.LINES):V.isLineLoop?it.setMode(k.LINE_LOOP):it.setMode(k.LINE_STRIP)}else V.isPoints?it.setMode(k.POINTS):V.isSprite&&it.setMode(k.TRIANGLES);if(V.isBatchedMesh)it.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)it.renderInstances(at,_t,V.count);else if(X.isInstancedBufferGeometry){const Ge=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,vr=Math.min(X.instanceCount,Ge);it.renderInstances(at,_t,vr)}else it.render(at,_t)};function Ze(T,B,X){T.transparent===!0&&T.side===Kt&&T.forceSinglePass===!1?(T.side=Dt,T.needsUpdate=!0,vs(T,B,X),T.side=On,T.needsUpdate=!0,vs(T,B,X),T.side=Kt):vs(T,B,X)}this.compile=function(T,B,X=null){X===null&&(X=T),_=be.get(X),_.init(),v.push(_),X.traverseVisible(function(V){V.isLight&&V.layers.test(B.layers)&&(_.pushLight(V),V.castShadow&&_.pushShadow(V))}),T!==X&&T.traverseVisible(function(V){V.isLight&&V.layers.test(B.layers)&&(_.pushLight(V),V.castShadow&&_.pushShadow(V))}),_.setupLights(x._useLegacyLights);const q=new Set;return T.traverse(function(V){const he=V.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){const Se=he[ve];Ze(Se,X,V),q.add(Se)}else Ze(he,X,V),q.add(he)}),v.pop(),_=null,q},this.compileAsync=function(T,B,X=null){const q=this.compile(T,B,X);return new Promise(V=>{function he(){if(q.forEach(function(ve){Oe.get(ve).currentProgram.isReady()&&q.delete(ve)}),q.size===0){V(T);return}setTimeout(he,10)}ye.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Ke=null;function mt(T){Ke&&Ke(T)}function wt(){Tt.stop()}function Je(){Tt.start()}const Tt=new hc;Tt.setAnimationLoop(mt),typeof self<"u"&&Tt.setContext(self),this.setAnimationLoop=function(T){Ke=T,He.setAnimationLoop(T),T===null?Tt.stop():Tt.start()},He.addEventListener("sessionstart",wt),He.addEventListener("sessionend",Je),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(B),B=He.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,B,A),_=be.get(T,v.length),_.init(),v.push(_),me.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Y.setFromProjectionMatrix(me),ae=this.localClippingEnabled,J=Be.init(this.clippingPlanes,ae),g=de.get(T,p.length),g.init(),p.push(g),tn(T,B,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(H,G),this.info.render.frame++,J===!0&&Be.beginShadows();const X=_.state.shadowsArray;if(Q.render(X,T,B),J===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(g,T),_.setupLights(x._useLegacyLights),B.isArrayCamera){const q=B.cameras;for(let V=0,he=q.length;V<he;V++){const ve=q[V];Oo(g,T,ve,ve.viewport)}}else Oo(g,T,B);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(x,T,B),Ne.resetDefaultState(),O=-1,M=null,v.pop(),v.length>0?_=v[v.length-1]:_=null,p.pop(),p.length>0?g=p[p.length-1]:g=null};function tn(T,B,X,q){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)_.pushLight(T),T.castShadow&&_.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){q&&Ue.setFromMatrixPosition(T.matrixWorld).applyMatrix4(me);const ve=ne.update(T),Se=T.material;Se.visible&&g.push(T,ve,Se,X,Ue.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Y.intersectsObject(T))){const ve=ne.update(T),Se=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ue.copy(T.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ue.copy(ve.boundingSphere.center)),Ue.applyMatrix4(T.matrixWorld).applyMatrix4(me)),Array.isArray(Se)){const Te=ve.groups;for(let ze=0,Pe=Te.length;ze<Pe;ze++){const De=Te[ze],at=Se[De.materialIndex];at&&at.visible&&g.push(T,ve,at,X,Ue.z,De)}}else Se.visible&&g.push(T,ve,Se,X,Ue.z,null)}}const he=T.children;for(let ve=0,Se=he.length;ve<Se;ve++)tn(he[ve],B,X,q)}function Oo(T,B,X,q){const V=T.opaque,he=T.transmissive,ve=T.transparent;_.setupLightsView(X),J===!0&&Be.setGlobalState(x.clippingPlanes,X),he.length>0&&Dc(V,he,B,X),q&&_e.viewport(E.copy(q)),V.length>0&&gs(V,B,X),he.length>0&&gs(he,B,X),ve.length>0&&gs(ve,B,X),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Dc(T,B,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const he=Ce.isWebGL2;pe===null&&(pe=new ii(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?hs:Fn,minFilter:cs,samples:he?4:0})),x.getDrawingBufferSize(Ie),he?pe.setSize(Ie.x,Ie.y):pe.setSize(rr(Ie.x),rr(Ie.y));const ve=x.getRenderTarget();x.setRenderTarget(pe),x.getClearColor(N),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=Nn,gs(T,X,q),R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe);let Te=!1;for(let ze=0,Pe=B.length;ze<Pe;ze++){const De=B[ze],at=De.object,Ft=De.geometry,_t=De.material,ln=De.group;if(_t.side===Kt&&at.layers.test(q.layers)){const it=_t.side;_t.side=Dt,_t.needsUpdate=!0,Bo(at,X,q,Ft,_t,ln),_t.side=it,_t.needsUpdate=!0,Te=!0}}Te===!0&&(R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe)),x.setRenderTarget(ve),x.setClearColor(N,P),x.toneMapping=Se}function gs(T,B,X){const q=B.isScene===!0?B.overrideMaterial:null;for(let V=0,he=T.length;V<he;V++){const ve=T[V],Se=ve.object,Te=ve.geometry,ze=q===null?ve.material:q,Pe=ve.group;Se.layers.test(X.layers)&&Bo(Se,B,X,Te,ze,Pe)}}function Bo(T,B,X,q,V,he){T.onBeforeRender(x,B,X,q,V,he),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(x,B,X,q,T,he),V.transparent===!0&&V.side===Kt&&V.forceSinglePass===!1?(V.side=Dt,V.needsUpdate=!0,x.renderBufferDirect(X,B,q,V,T,he),V.side=On,V.needsUpdate=!0,x.renderBufferDirect(X,B,q,V,T,he),V.side=Kt):x.renderBufferDirect(X,B,q,V,T,he),T.onAfterRender(x,B,X,q,V,he)}function vs(T,B,X){B.isScene!==!0&&(B=Ee);const q=Oe.get(T),V=_.state.lights,he=_.state.shadowsArray,ve=V.state.version,Se=ge.getParameters(T,V.state,he,B,X),Te=ge.getProgramCacheKey(Se);let ze=q.programs;q.environment=T.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(T.isMeshStandardMaterial?W:b).get(T.envMap||q.environment),ze===void 0&&(T.addEventListener("dispose",oe),ze=new Map,q.programs=ze);let Pe=ze.get(Te);if(Pe!==void 0){if(q.currentProgram===Pe&&q.lightsStateVersion===ve)return Ho(T,Se),Pe}else Se.uniforms=ge.getUniforms(T),T.onBuild(X,Se,x),T.onBeforeCompile(Se,x),Pe=ge.acquireProgram(Se,Te),ze.set(Te,Pe),q.uniforms=Se.uniforms;const De=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(De.clippingPlanes=Be.uniform),Ho(T,Se),q.needsLights=Fc(T),q.lightsStateVersion=ve,q.needsLights&&(De.ambientLightColor.value=V.state.ambient,De.lightProbe.value=V.state.probe,De.directionalLights.value=V.state.directional,De.directionalLightShadows.value=V.state.directionalShadow,De.spotLights.value=V.state.spot,De.spotLightShadows.value=V.state.spotShadow,De.rectAreaLights.value=V.state.rectArea,De.ltc_1.value=V.state.rectAreaLTC1,De.ltc_2.value=V.state.rectAreaLTC2,De.pointLights.value=V.state.point,De.pointLightShadows.value=V.state.pointShadow,De.hemisphereLights.value=V.state.hemi,De.directionalShadowMap.value=V.state.directionalShadowMap,De.directionalShadowMatrix.value=V.state.directionalShadowMatrix,De.spotShadowMap.value=V.state.spotShadowMap,De.spotLightMatrix.value=V.state.spotLightMatrix,De.spotLightMap.value=V.state.spotLightMap,De.pointShadowMap.value=V.state.pointShadowMap,De.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Pe,q.uniformsList=null,Pe}function zo(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=Qs.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function Ho(T,B){const X=Oe.get(T);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function Uc(T,B,X,q,V){B.isScene!==!0&&(B=Ee),R.resetTextureUnits();const he=B.fog,ve=q.isMeshStandardMaterial?B.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:bn,Te=(q.isMeshStandardMaterial?W:b).get(q.envMap||ve),ze=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Pe=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),De=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,Ft=!!X.morphAttributes.color;let _t=Nn;q.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_t=x.toneMapping);const ln=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,it=ln!==void 0?ln.length:0,Ge=Oe.get(q),vr=_.state.lights;if(J===!0&&(ae===!0||T!==M)){const kt=T===M&&q.id===O;Be.setState(q,T,kt)}let rt=!1;q.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==vr.state.version||Ge.outputColorSpace!==Se||V.isBatchedMesh&&Ge.batching===!1||!V.isBatchedMesh&&Ge.batching===!0||V.isInstancedMesh&&Ge.instancing===!1||!V.isInstancedMesh&&Ge.instancing===!0||V.isSkinnedMesh&&Ge.skinning===!1||!V.isSkinnedMesh&&Ge.skinning===!0||V.isInstancedMesh&&Ge.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ge.instancingColor===!1&&V.instanceColor!==null||Ge.envMap!==Te||q.fog===!0&&Ge.fog!==he||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Be.numPlanes||Ge.numIntersection!==Be.numIntersection)||Ge.vertexAlphas!==ze||Ge.vertexTangents!==Pe||Ge.morphTargets!==De||Ge.morphNormals!==at||Ge.morphColors!==Ft||Ge.toneMapping!==_t||Ce.isWebGL2===!0&&Ge.morphTargetsCount!==it)&&(rt=!0):(rt=!0,Ge.__version=q.version);let zn=Ge.currentProgram;rt===!0&&(zn=vs(q,B,V));let Go=!1,Wi=!1,xr=!1;const Mt=zn.getUniforms(),Hn=Ge.uniforms;if(_e.useProgram(zn.program)&&(Go=!0,Wi=!0,xr=!0),q.id!==O&&(O=q.id,Wi=!0),Go||M!==T){Mt.setValue(k,"projectionMatrix",T.projectionMatrix),Mt.setValue(k,"viewMatrix",T.matrixWorldInverse);const kt=Mt.map.cameraPosition;kt!==void 0&&kt.setValue(k,Ue.setFromMatrixPosition(T.matrixWorld)),Ce.logarithmicDepthBuffer&&Mt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Mt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Wi=!0,xr=!0)}if(V.isSkinnedMesh){Mt.setOptional(k,V,"bindMatrix"),Mt.setOptional(k,V,"bindMatrixInverse");const kt=V.skeleton;kt&&(Ce.floatVertexTextures?(kt.boneTexture===null&&kt.computeBoneTexture(),Mt.setValue(k,"boneTexture",kt.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(Mt.setOptional(k,V,"batchingTexture"),Mt.setValue(k,"batchingTexture",V._matricesTexture,R));const yr=X.morphAttributes;if((yr.position!==void 0||yr.normal!==void 0||yr.color!==void 0&&Ce.isWebGL2===!0)&&Ve.update(V,X,zn),(Wi||Ge.receiveShadow!==V.receiveShadow)&&(Ge.receiveShadow=V.receiveShadow,Mt.setValue(k,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Hn.envMap.value=Te,Hn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Wi&&(Mt.setValue(k,"toneMappingExposure",x.toneMappingExposure),Ge.needsLights&&Nc(Hn,xr),he&&q.fog===!0&&le.refreshFogUniforms(Hn,he),le.refreshMaterialUniforms(Hn,q,j,I,pe),Qs.upload(k,zo(Ge),Hn,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Qs.upload(k,zo(Ge),Hn,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Mt.setValue(k,"center",V.center),Mt.setValue(k,"modelViewMatrix",V.modelViewMatrix),Mt.setValue(k,"normalMatrix",V.normalMatrix),Mt.setValue(k,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const kt=q.uniformsGroups;for(let Mr=0,Oc=kt.length;Mr<Oc;Mr++)if(Ce.isWebGL2){const ko=kt[Mr];qe.update(ko,zn),qe.bind(ko,zn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return zn}function Nc(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Fc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,B,X){Oe.get(T.texture).__webglTexture=B,Oe.get(T.depthTexture).__webglTexture=X;const q=Oe.get(T);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,B){const X=Oe.get(T);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,X=0){A=T,C=B,w=X;let q=!0,V=null,he=!1,ve=!1;if(T){const Te=Oe.get(T);Te.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(k.FRAMEBUFFER,null),q=!1):Te.__webglFramebuffer===void 0?R.setupRenderTarget(T):Te.__hasExternalTextures&&R.rebindTextures(T,Oe.get(T.texture).__webglTexture,Oe.get(T.depthTexture).__webglTexture);const ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ve=!0);const Pe=Oe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Pe[B])?V=Pe[B][X]:V=Pe[B],he=!0):Ce.isWebGL2&&T.samples>0&&R.useMultisampledRTT(T)===!1?V=Oe.get(T).__webglMultisampledFramebuffer:Array.isArray(Pe)?V=Pe[X]:V=Pe,E.copy(T.viewport),U.copy(T.scissor),z=T.scissorTest}else E.copy(K).multiplyScalar(j).floor(),U.copy(Z).multiplyScalar(j).floor(),z=$;if(_e.bindFramebuffer(k.FRAMEBUFFER,V)&&Ce.drawBuffers&&q&&_e.drawBuffers(T,V),_e.viewport(E),_e.scissor(U),_e.setScissorTest(z),he){const Te=Oe.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,Te.__webglTexture,X)}else if(ve){const Te=Oe.get(T.texture),ze=B||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Te.__webglTexture,X||0,ze)}O=-1},this.readRenderTargetPixels=function(T,B,X,q,V,he,ve){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){_e.bindFramebuffer(k.FRAMEBUFFER,Se);try{const Te=T.texture,ze=Te.format,Pe=Te.type;if(ze!==Qt&&fe.convert(ze)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const De=Pe===hs&&(ye.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Pe!==Fn&&fe.convert(Pe)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===In&&(Ce.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-q&&X>=0&&X<=T.height-V&&k.readPixels(B,X,q,V,fe.convert(ze),fe.convert(Pe),he)}finally{const Te=A!==null?Oe.get(A).__webglFramebuffer:null;_e.bindFramebuffer(k.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(T,B,X=0){const q=Math.pow(2,-X),V=Math.floor(B.image.width*q),he=Math.floor(B.image.height*q);R.setTexture2D(B,0),k.copyTexSubImage2D(k.TEXTURE_2D,X,0,0,T.x,T.y,V,he),_e.unbindTexture()},this.copyTextureToTexture=function(T,B,X,q=0){const V=B.image.width,he=B.image.height,ve=fe.convert(X.format),Se=fe.convert(X.type);R.setTexture2D(X,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,X.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,X.unpackAlignment),B.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,q,T.x,T.y,V,he,ve,Se,B.image.data):B.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,q,T.x,T.y,B.mipmaps[0].width,B.mipmaps[0].height,ve,B.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,q,T.x,T.y,ve,Se,B.image),q===0&&X.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(T,B,X,q,V=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=T.max.x-T.min.x+1,ve=T.max.y-T.min.y+1,Se=T.max.z-T.min.z+1,Te=fe.convert(q.format),ze=fe.convert(q.type);let Pe;if(q.isData3DTexture)R.setTexture3D(q,0),Pe=k.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)R.setTexture2DArray(q,0),Pe=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,q.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,q.unpackAlignment);const De=k.getParameter(k.UNPACK_ROW_LENGTH),at=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Ft=k.getParameter(k.UNPACK_SKIP_PIXELS),_t=k.getParameter(k.UNPACK_SKIP_ROWS),ln=k.getParameter(k.UNPACK_SKIP_IMAGES),it=X.isCompressedTexture?X.mipmaps[V]:X.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,it.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,it.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,T.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,T.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,T.min.z),X.isDataTexture||X.isData3DTexture?k.texSubImage3D(Pe,V,B.x,B.y,B.z,he,ve,Se,Te,ze,it.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(Pe,V,B.x,B.y,B.z,he,ve,Se,Te,it.data)):k.texSubImage3D(Pe,V,B.x,B.y,B.z,he,ve,Se,Te,ze,it),k.pixelStorei(k.UNPACK_ROW_LENGTH,De),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,at),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ft),k.pixelStorei(k.UNPACK_SKIP_ROWS,_t),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ln),V===0&&q.generateMipmaps&&k.generateMipmap(Pe),_e.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),_e.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,_e.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===To?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===dr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===vt?ti:Zl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ti?vt:bn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class i_ extends vc{}i_.prototype.isWebGL1Renderer=!0;class Lo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Le(e),this.density=t}clone(){return new Lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class s_ extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class r_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=po,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const At=new F;class ar{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array),s=je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ar(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Io extends Bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Si;const $i=new F,bi=new F,Ei=new F,wi=new Ae,Zi=new Ae,xc=new ot,Gs=new F,Ki=new F,ks=new F,ll=new Ae,Kr=new Ae,cl=new Ae;class yc extends dt{constructor(e=new Io){if(super(),this.isSprite=!0,this.type="Sprite",Si===void 0){Si=new Nt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new r_(t,5);Si.setIndex([0,1,2,0,2,3]),Si.setAttribute("position",new ar(n,3,0,!1)),Si.setAttribute("uv",new ar(n,2,3,!1))}this.geometry=Si,this.material=e,this.center=new Ae(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bi.setFromMatrixScale(this.matrixWorld),xc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ei.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bi.multiplyScalar(-Ei.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Vs(Gs.set(-.5,-.5,0),Ei,a,bi,i,s),Vs(Ki.set(.5,-.5,0),Ei,a,bi,i,s),Vs(ks.set(.5,.5,0),Ei,a,bi,i,s),ll.set(0,0),Kr.set(1,0),cl.set(1,1);let l=e.ray.intersectTriangle(Gs,Ki,ks,!1,$i);if(l===null&&(Vs(Ki.set(-.5,.5,0),Ei,a,bi,i,s),Kr.set(0,1),l=e.ray.intersectTriangle(Gs,ks,Ki,!1,$i),l===null))return;const h=e.ray.origin.distanceTo($i);h<e.near||h>e.far||t.push({distance:h,point:$i.clone(),uv:Wt.getInterpolation($i,Gs,Ki,ks,ll,Kr,cl,new Ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Vs(r,e,t,n,i,s){wi.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Zi.x=s*wi.x-i*wi.y,Zi.y=i*wi.x+s*wi.y):Zi.copy(wi),r.copy(e),r.x+=Zi.x,r.y+=Zi.y,r.applyMatrix4(xc)}class Mc extends Bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hl=new ot,vo=new nc,Ws=new fr,Xs=new F;class o_ extends dt{constructor(e=new Nt,t=new Mc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(i),Ws.radius+=s,e.ray.intersectsSphere(Ws)===!1)return;hl.copy(i).invert(),vo.copy(e.ray).applyMatrix4(hl);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,u=n.index,o=n.attributes.position;if(u!==null){const c=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let m=c,g=d;m<g;m++){const _=u.getX(m);Xs.fromBufferAttribute(o,_),ul(Xs,_,h,i,e,t,this)}}else{const c=Math.max(0,a.start),d=Math.min(o.count,a.start+a.count);for(let m=c,g=d;m<g;m++)Xs.fromBufferAttribute(o,m),ul(Xs,m,h,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function ul(r,e,t,n,i,s,a){const l=vo.distanceSqToPoint(r);if(l<t){const h=new F;vo.closestPointToPoint(r,h),h.applyMatrix4(n);const u=i.ray.origin.distanceTo(h);if(u<i.near||u>i.far)return;s.push({distance:u,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,object:a})}}class xo extends Ut{constructor(e,t,n,i,s,a,l,h,u){super(e,t,n,i,s,a,l,h,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _r extends Nt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],l=[],h=[],u=new F,f=new Ae;a.push(0,0,0),l.push(0,0,1),h.push(.5,.5);for(let o=0,c=3;o<=t;o++,c+=3){const d=n+o/t*i;u.x=e*Math.cos(d),u.y=e*Math.sin(d),a.push(u.x,u.y,u.z),l.push(0,0,1),f.x=(a[c]/e+1)/2,f.y=(a[c+1]/e+1)/2,h.push(f.x,f.y)}for(let o=1;o<=t;o++)s.push(o,o+1,0);this.setIndex(s),this.setAttribute("position",new yt(a,3)),this.setAttribute("normal",new yt(l,3)),this.setAttribute("uv",new yt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ni extends Nt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:l,thetaLength:h};const u=this;i=Math.floor(i),s=Math.floor(s);const f=[],o=[],c=[],d=[];let m=0;const g=[],_=n/2;let p=0;v(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(f),this.setAttribute("position",new yt(o,3)),this.setAttribute("normal",new yt(c,3)),this.setAttribute("uv",new yt(d,2));function v(){const S=new F,C=new F;let w=0;const A=(t-e)/n;for(let O=0;O<=s;O++){const M=[],E=O/s,U=E*(t-e)+e;for(let z=0;z<=i;z++){const N=z/i,P=N*h+l,L=Math.sin(P),I=Math.cos(P);C.x=U*L,C.y=-E*n+_,C.z=U*I,o.push(C.x,C.y,C.z),S.set(L,A,I).normalize(),c.push(S.x,S.y,S.z),d.push(N,1-E),M.push(m++)}g.push(M)}for(let O=0;O<i;O++)for(let M=0;M<s;M++){const E=g[M][O],U=g[M+1][O],z=g[M+1][O+1],N=g[M][O+1];f.push(E,U,N),f.push(U,z,N),w+=6}u.addGroup(p,w,0),p+=w}function x(S){const C=m,w=new Ae,A=new F;let O=0;const M=S===!0?e:t,E=S===!0?1:-1;for(let z=1;z<=i;z++)o.push(0,_*E,0),c.push(0,E,0),d.push(.5,.5),m++;const U=m;for(let z=0;z<=i;z++){const P=z/i*h+l,L=Math.cos(P),I=Math.sin(P);A.x=M*I,A.y=_*E,A.z=M*L,o.push(A.x,A.y,A.z),c.push(0,E,0),w.x=L*.5+.5,w.y=I*.5*E+.5,d.push(w.x,w.y),m++}for(let z=0;z<i;z++){const N=C+z,P=U+z;S===!0?f.push(P,P+1,N):f.push(P+1,P,N),O+=3}u.addGroup(p,O,S===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Do extends Nt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(a+l,Math.PI);let u=0;const f=[],o=new F,c=new F,d=[],m=[],g=[],_=[];for(let p=0;p<=n;p++){const v=[],x=p/n;let S=0;p===0&&a===0?S=.5/t:p===n&&h===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const w=C/t;o.x=-e*Math.cos(i+w*s)*Math.sin(a+x*l),o.y=e*Math.cos(a+x*l),o.z=e*Math.sin(i+w*s)*Math.sin(a+x*l),m.push(o.x,o.y,o.z),c.copy(o).normalize(),g.push(c.x,c.y,c.z),_.push(w+S,1-x),v.push(u++)}f.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const x=f[p][v+1],S=f[p][v],C=f[p+1][v],w=f[p+1][v+1];(p!==0||a>0)&&d.push(x,S,w),(p!==n-1||h<Math.PI)&&d.push(S,C,w)}this.setIndex(d),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(g,3)),this.setAttribute("uv",new yt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Do(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class a_ extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wo,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Li extends Bn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Le(16777215),this.specular=new Le(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wo,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gr extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class l_ extends gr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Jr=new ot,dl=new F,fl=new F;class Sc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ro,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(dl),fl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fl),t.updateMatrixWorld(),Jr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const pl=new ot,Ji=new F,Qr=new F;class c_ extends Sc{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ji.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ji),Qr.copy(n.position),Qr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qr),n.updateMatrixWorld(),i.makeTranslation(-Ji.x,-Ji.y,-Ji.z),pl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pl)}}class h_ extends gr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new c_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class u_ extends Sc{constructor(){super(new uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ml extends gr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new u_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class d_ extends gr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class f_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_l(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_l();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _l(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:So}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=So);class p_{constructor(e){this.scene=new s_,this.scene.background=null,this.scene.fog=new Lo("#5f7fa0",.014);const t=window.innerWidth/window.innerHeight;this.camera=new zt(47,t,.1,300),this.camera.position.set(0,5.2,13.5),this.camera.lookAt(0,0,0),this.renderer=new vc({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=vt,this.renderer.toneMapping=Gl,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Hl,(e||document.getElementById("app")||document.body).appendChild(this.renderer.domElement),this._ballMesh=null,this._lookY=0,this.shakeIntensity=0,this._setupLights(),this._onResize=this._onResize.bind(this),window.addEventListener("resize",this._onResize)}_setupLights(){const e=new d_(16185343,.5);this.scene.add(e);const t=new ml(16774117,1.05);t.position.set(8,22,10),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-15,t.shadow.camera.right=15,t.shadow.camera.top=15,t.shadow.camera.bottom=-15,t.shadow.normalBias=.02,this.scene.add(t);const n=new l_(10411263,2569546,.6);this.scene.add(n);const i=new ml(9034440,.32);i.position.set(-10,11,-9),this.scene.add(i);const s=new h_(16763303,.18,36,2);s.position.set(0,-7,2),this.scene.add(s)}setupCamera(e){this._ballMesh=e,this.camera.position.set(0,5.2,13.5),this.camera.lookAt(0,0,0)}updateCamera(e){if(!this._ballMesh)return;const t=this._ballMesh.position.y+4.2,n=this._ballMesh.position.y-1.05;this.camera.position.y+=(t-this.camera.position.y)*.07,this.camera.position.x=0,this.camera.position.z=13.5,this._lookY=this._lookY??0,this._lookY+=(n-this._lookY)*.075,this.camera.lookAt(0,this._lookY,0)}triggerShake(e){this.shakeIntensity=Math.max(this.shakeIntensity,e)}render(){if(this.shakeIntensity>1e-4){const e=this.shakeIntensity,t=(Math.random()-.5)*e,n=(Math.random()-.5)*e;this.camera.position.x+=t,this.camera.position.y+=n,this.shakeIntensity*=.88}else this.shakeIntensity=0;this.renderer.render(this.scene,this.camera)}_onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}get scene3D(){return this.scene}get cam(){return this.camera}}class en{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){const e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){const e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){const t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new y);const t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new y);const n=this.elements,i=e.x,s=e.y,a=e.z;return t.x=n[0]*i+n[1]*s+n[2]*a,t.y=n[3]*i+n[4]*s+n[5]*a,t.z=n[6]*i+n[7]*s+n[8]*a,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(e,t){t===void 0&&(t=new en);const n=this.elements,i=e.elements,s=t.elements,a=n[0],l=n[1],h=n[2],u=n[3],f=n[4],o=n[5],c=n[6],d=n[7],m=n[8],g=i[0],_=i[1],p=i[2],v=i[3],x=i[4],S=i[5],C=i[6],w=i[7],A=i[8];return s[0]=a*g+l*v+h*C,s[1]=a*_+l*x+h*w,s[2]=a*p+l*S+h*A,s[3]=u*g+f*v+o*C,s[4]=u*_+f*x+o*w,s[5]=u*p+f*S+o*A,s[6]=c*g+d*v+m*C,s[7]=c*_+d*x+m*w,s[8]=c*p+d*S+m*A,t}scale(e,t){t===void 0&&(t=new en);const n=this.elements,i=t.elements;for(let s=0;s!==3;s++)i[3*s+0]=e.x*n[3*s+0],i[3*s+1]=e.y*n[3*s+1],i[3*s+2]=e.z*n[3*s+2];return t}solve(e,t){t===void 0&&(t=new y);const n=3,i=4,s=[];let a,l;for(a=0;a<n*i;a++)s.push(0);for(a=0;a<3;a++)for(l=0;l<3;l++)s[a+i*l]=this.elements[a+3*l];s[3+4*0]=e.x,s[3+4*1]=e.y,s[3+4*2]=e.z;let h=3;const u=h;let f;const o=4;let c;do{if(a=u-h,s[a+i*a]===0){for(l=a+1;l<u;l++)if(s[a+i*l]!==0){f=o;do c=o-f,s[c+i*a]+=s[c+i*l];while(--f);break}}if(s[a+i*a]!==0)for(l=a+1;l<u;l++){const d=s[a+i*l]/s[a+i*a];f=o;do c=o-f,s[c+i*l]=c<=a?0:s[c+i*l]-s[c+i*a]*d;while(--f)}}while(--h);if(t.z=s[2*i+3]/s[2*i+2],t.y=(s[1*i+3]-s[1*i+2]*t.z)/s[1*i+1],t.x=(s[0*i+3]-s[0*i+2]*t.z-s[0*i+1]*t.y)/s[0*i+0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,n){if(n===void 0)return this.elements[t+3*e];this.elements[t+3*e]=n}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e="";const t=",";for(let n=0;n<9;n++)e+=this.elements[n]+t;return e}reverse(e){e===void 0&&(e=new en);const t=3,n=6,i=m_;let s,a;for(s=0;s<3;s++)for(a=0;a<3;a++)i[s+n*a]=this.elements[s+3*a];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let l=3;const h=l;let u;const f=n;let o;do{if(s=h-l,i[s+n*s]===0){for(a=s+1;a<h;a++)if(i[s+n*a]!==0){u=f;do o=f-u,i[o+n*s]+=i[o+n*a];while(--u);break}}if(i[s+n*s]!==0)for(a=s+1;a<h;a++){const c=i[s+n*a]/i[s+n*s];u=f;do o=f-u,i[o+n*a]=o<=s?0:i[o+n*a]-i[o+n*s]*c;while(--u)}}while(--l);s=2;do{a=s-1;do{const c=i[s+n*a]/i[s+n*s];u=n;do o=n-u,i[o+n*a]=i[o+n*a]-i[o+n*s]*c;while(--u)}while(a--)}while(--s);s=2;do{const c=1/i[s+n*s];u=n;do o=n-u,i[o+n*s]=i[o+n*s]*c;while(--u)}while(s--);s=2;do{a=2;do{if(o=i[t+a+n*s],isNaN(o)||o===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(s,a,o)}while(a--)}while(s--);return e}setRotationFromQuaternion(e){const t=e.x,n=e.y,i=e.z,s=e.w,a=t+t,l=n+n,h=i+i,u=t*a,f=t*l,o=t*h,c=n*l,d=n*h,m=i*h,g=s*a,_=s*l,p=s*h,v=this.elements;return v[3*0+0]=1-(c+m),v[3*0+1]=f-p,v[3*0+2]=o+_,v[3*1+0]=f+p,v[3*1+1]=1-(u+m),v[3*1+2]=d-g,v[3*2+0]=o-_,v[3*2+1]=d+g,v[3*2+2]=1-(u+c),this}transpose(e){e===void 0&&(e=new en);const t=this.elements,n=e.elements;let i;return n[0]=t[0],n[4]=t[4],n[8]=t[8],i=t[1],n[1]=t[3],n[3]=i,i=t[2],n[2]=t[6],n[6]=i,i=t[5],n[5]=t[7],n[7]=i,e}}const m_=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class y{constructor(e,t,n){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0),this.x=e,this.y=t,this.z=n}cross(e,t){t===void 0&&(t=new y);const n=e.x,i=e.y,s=e.z,a=this.x,l=this.y,h=this.z;return t.x=l*s-h*i,t.y=h*n-a*s,t.z=a*i-l*n,t}set(e,t,n){return this.x=e,this.y=t,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(e,t){if(t)t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z;else return new y(this.x+e.x,this.y+e.y,this.z+e.z)}vsub(e,t){if(t)t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z;else return new y(this.x-e.x,this.y-e.y,this.z-e.z)}crossmat(){return new en([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const e=this.x,t=this.y,n=this.z,i=Math.sqrt(e*e+t*t+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(e){e===void 0&&(e=new y);const t=this.x,n=this.y,i=this.z;let s=Math.sqrt(t*t+n*n+i*i);return s>0?(s=1/s,e.x=t*s,e.y=n*s,e.z=i*s):(e.x=1,e.y=0,e.z=0),e}length(){const e=this.x,t=this.y,n=this.z;return Math.sqrt(e*e+t*t+n*n)}lengthSquared(){return this.dot(this)}distanceTo(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,l=e.z;return Math.sqrt((s-t)*(s-t)+(a-n)*(a-n)+(l-i)*(l-i))}distanceSquared(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,l=e.z;return(s-t)*(s-t)+(a-n)*(a-n)+(l-i)*(l-i)}scale(e,t){t===void 0&&(t=new y);const n=this.x,i=this.y,s=this.z;return t.x=e*n,t.y=e*i,t.z=e*s,t}vmul(e,t){return t===void 0&&(t=new y),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}addScaledVector(e,t,n){return n===void 0&&(n=new y),n.x=this.x+e*t.x,n.y=this.y+e*t.y,n.z=this.z+e*t.z,n}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(e){return e===void 0&&(e=new y),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}tangents(e,t){const n=this.length();if(n>0){const i=__,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const a=g_;Math.abs(i.x)<.9?(a.set(1,0,0),i.cross(a,e)):(a.set(0,1,0),i.cross(a,e)),i.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,n){const i=this.x,s=this.y,a=this.z;n.x=i+(e.x-i)*t,n.y=s+(e.y-s)*t,n.z=a+(e.z-a)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(gl),gl.almostEquals(e,t)}clone(){return new y(this.x,this.y,this.z)}}y.ZERO=new y(0,0,0);y.UNIT_X=new y(1,0,0);y.UNIT_Y=new y(0,1,0);y.UNIT_Z=new y(0,0,1);const __=new y,g_=new y,gl=new y;class Gt{constructor(e){e===void 0&&(e={}),this.lowerBound=new y,this.upperBound=new y,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,n,i){const s=this.lowerBound,a=this.upperBound,l=n;s.copy(e[0]),l&&l.vmult(s,s),a.copy(s);for(let h=1;h<e.length;h++){let u=e[h];l&&(l.vmult(u,vl),u=vl),u.x>a.x&&(a.x=u.x),u.x<s.x&&(s.x=u.x),u.y>a.y&&(a.y=u.y),u.y<s.y&&(s.y=u.y),u.z>a.z&&(a.z=u.z),u.z<s.z&&(s.z=u.z)}return t&&(t.vadd(s,s),t.vadd(a,a)),i&&(s.x-=i,s.y-=i,s.z-=i,a.x+=i,a.y+=i,a.z+=i),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new Gt().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){const t=this.lowerBound,n=this.upperBound,i=e.lowerBound,s=e.upperBound,a=i.x<=n.x&&n.x<=s.x||t.x<=s.x&&s.x<=n.x,l=i.y<=n.y&&n.y<=s.y||t.y<=s.y&&s.y<=n.y,h=i.z<=n.z&&n.z<=s.z||t.z<=s.z&&s.z<=n.z;return a&&l&&h}volume(){const e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){const t=this.lowerBound,n=this.upperBound,i=e.lowerBound,s=e.upperBound;return t.x<=i.x&&n.x>=s.x&&t.y<=i.y&&n.y>=s.y&&t.z<=i.z&&n.z>=s.z}getCorners(e,t,n,i,s,a,l,h){const u=this.lowerBound,f=this.upperBound;e.copy(u),t.set(f.x,u.y,u.z),n.set(f.x,f.y,u.z),i.set(u.x,f.y,f.z),s.set(f.x,u.y,f.z),a.set(u.x,f.y,u.z),l.set(u.x,u.y,f.z),h.copy(f)}toLocalFrame(e,t){const n=xl,i=n[0],s=n[1],a=n[2],l=n[3],h=n[4],u=n[5],f=n[6],o=n[7];this.getCorners(i,s,a,l,h,u,f,o);for(let c=0;c!==8;c++){const d=n[c];e.pointToLocal(d,d)}return t.setFromPoints(n)}toWorldFrame(e,t){const n=xl,i=n[0],s=n[1],a=n[2],l=n[3],h=n[4],u=n[5],f=n[6],o=n[7];this.getCorners(i,s,a,l,h,u,f,o);for(let c=0;c!==8;c++){const d=n[c];e.pointToWorld(d,d)}return t.setFromPoints(n)}overlapsRay(e){const{direction:t,from:n}=e,i=1/t.x,s=1/t.y,a=1/t.z,l=(this.lowerBound.x-n.x)*i,h=(this.upperBound.x-n.x)*i,u=(this.lowerBound.y-n.y)*s,f=(this.upperBound.y-n.y)*s,o=(this.lowerBound.z-n.z)*a,c=(this.upperBound.z-n.z)*a,d=Math.max(Math.max(Math.min(l,h),Math.min(u,f)),Math.min(o,c)),m=Math.min(Math.min(Math.max(l,h),Math.max(u,f)),Math.max(o,c));return!(m<0||d>m)}}const vl=new y,xl=[new y,new y,new y,new y,new y,new y,new y,new y];class yl{constructor(){this.matrix=[]}get(e,t){let{index:n}=e,{index:i}=t;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(e,t,n){let{index:i}=e,{index:s}=t;if(s>i){const a=s;s=i,i=a}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}setNumObjects(e){this.matrix.length=e*(e-1)>>1}}class bc{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t),this}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[e]!==void 0&&n[e].includes(t))}hasAnyEventListener(e){return this._listeners===void 0?!1:this._listeners[e]!==void 0}removeEventListener(e,t){if(this._listeners===void 0)return this;const n=this._listeners;if(n[e]===void 0)return this;const i=n[e].indexOf(t);return i!==-1&&n[e].splice(i,1),this}dispatchEvent(e){if(this._listeners===void 0)return this;const n=this._listeners[e.type];if(n!==void 0){e.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,e)}return this}}class lt{constructor(e,t,n,i){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=e,this.y=t,this.z=n,this.w=i}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){const n=Math.sin(t*.5);return this.x=e.x*n,this.y=e.y*n,this.z=e.z*n,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new y),this.normalize();const t=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/n,e.y=this.y/n,e.z=this.z/n),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){const n=v_,i=x_;e.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=e.cross(t);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(e,t){t===void 0&&(t=new lt);const n=this.x,i=this.y,s=this.z,a=this.w,l=e.x,h=e.y,u=e.z,f=e.w;return t.x=n*f+a*l+i*u-s*h,t.y=i*f+a*h+s*l-n*u,t.z=s*f+a*u+n*h-i*l,t.w=a*f-n*l-i*h-s*u,t}inverse(e){e===void 0&&(e=new lt);const t=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(e);const a=1/(t*t+n*n+i*i+s*s);return e.x*=a,e.y*=a,e.z*=a,e.w*=a,e}conjugate(e){return e===void 0&&(e=new lt),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){const e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new y);const n=e.x,i=e.y,s=e.z,a=this.x,l=this.y,h=this.z,u=this.w,f=u*n+l*s-h*i,o=u*i+h*n-a*s,c=u*s+a*i-l*n,d=-a*n-l*i-h*s;return t.x=f*u+d*-a+o*-h-c*-l,t.y=o*u+d*-l+c*-a-f*-h,t.z=c*u+d*-h+f*-l-o*-a,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t="YZX");let n,i,s;const a=this.x,l=this.y,h=this.z,u=this.w;switch(t){case"YZX":const f=a*l+h*u;if(f>.499&&(n=2*Math.atan2(a,u),i=Math.PI/2,s=0),f<-.499&&(n=-2*Math.atan2(a,u),i=-Math.PI/2,s=0),n===void 0){const o=a*a,c=l*l,d=h*h;n=Math.atan2(2*l*u-2*a*h,1-2*c-2*d),i=Math.asin(2*f),s=Math.atan2(2*a*u-2*l*h,1-2*o-2*d)}break;default:throw new Error(`Euler order ${t} not supported yet.`)}e.y=n,e.z=i,e.x=s}setFromEuler(e,t,n,i){i===void 0&&(i="XYZ");const s=Math.cos(e/2),a=Math.cos(t/2),l=Math.cos(n/2),h=Math.sin(e/2),u=Math.sin(t/2),f=Math.sin(n/2);return i==="XYZ"?(this.x=h*a*l+s*u*f,this.y=s*u*l-h*a*f,this.z=s*a*f+h*u*l,this.w=s*a*l-h*u*f):i==="YXZ"?(this.x=h*a*l+s*u*f,this.y=s*u*l-h*a*f,this.z=s*a*f-h*u*l,this.w=s*a*l+h*u*f):i==="ZXY"?(this.x=h*a*l-s*u*f,this.y=s*u*l+h*a*f,this.z=s*a*f+h*u*l,this.w=s*a*l-h*u*f):i==="ZYX"?(this.x=h*a*l-s*u*f,this.y=s*u*l+h*a*f,this.z=s*a*f-h*u*l,this.w=s*a*l+h*u*f):i==="YZX"?(this.x=h*a*l+s*u*f,this.y=s*u*l+h*a*f,this.z=s*a*f-h*u*l,this.w=s*a*l-h*u*f):i==="XZY"&&(this.x=h*a*l-s*u*f,this.y=s*u*l-h*a*f,this.z=s*a*f+h*u*l,this.w=s*a*l+h*u*f),this}clone(){return new lt(this.x,this.y,this.z,this.w)}slerp(e,t,n){n===void 0&&(n=new lt);const i=this.x,s=this.y,a=this.z,l=this.w;let h=e.x,u=e.y,f=e.z,o=e.w,c,d,m,g,_;return d=i*h+s*u+a*f+l*o,d<0&&(d=-d,h=-h,u=-u,f=-f,o=-o),1-d>1e-6?(c=Math.acos(d),m=Math.sin(c),g=Math.sin((1-t)*c)/m,_=Math.sin(t*c)/m):(g=1-t,_=t),n.x=g*i+_*h,n.y=g*s+_*u,n.z=g*a+_*f,n.w=g*l+_*o,n}integrate(e,t,n,i){i===void 0&&(i=new lt);const s=e.x*n.x,a=e.y*n.y,l=e.z*n.z,h=this.x,u=this.y,f=this.z,o=this.w,c=t*.5;return i.x+=c*(s*o+a*f-l*u),i.y+=c*(a*o+l*h-s*f),i.z+=c*(l*o+s*u-a*h),i.w+=c*(-s*h-a*u-l*f),i}}const v_=new y,x_=new y,y_={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class ue{constructor(e){e===void 0&&(e={}),this.id=ue.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=e.collisionResponse?e.collisionResponse:!0,this.collisionFilterGroup=e.collisionFilterGroup!==void 0?e.collisionFilterGroup:1,this.collisionFilterMask=e.collisionFilterMask!==void 0?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}ue.idCounter=0;ue.types=y_;class Xe{constructor(e){e===void 0&&(e={}),this.position=new y,this.quaternion=new lt,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(e,t){return Xe.pointToLocalFrame(this.position,this.quaternion,e,t)}pointToWorld(e,t){return Xe.pointToWorldFrame(this.position,this.quaternion,e,t)}vectorToWorldFrame(e,t){return t===void 0&&(t=new y),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,n,i){return i===void 0&&(i=new y),n.vsub(e,i),t.conjugate(Ml),Ml.vmult(i,i),i}static pointToWorldFrame(e,t,n,i){return i===void 0&&(i=new y),t.vmult(n,i),i.vadd(e,i),i}static vectorToWorldFrame(e,t,n){return n===void 0&&(n=new y),e.vmult(t,n),n}static vectorToLocalFrame(e,t,n,i){return i===void 0&&(i=new y),t.w*=-1,t.vmult(n,i),t.w*=-1,i}}const Ml=new lt;class Fi extends ue{constructor(e){e===void 0&&(e={});const{vertices:t=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:a}=e;super({type:ue.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),a?this.boundingSphereRadius=a:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const e=this.faces,t=this.vertices,n=this.uniqueEdges;n.length=0;const i=new y;for(let s=0;s!==e.length;s++){const a=e[s],l=a.length;for(let h=0;h!==l;h++){const u=(h+1)%l;t[a[h]].vsub(t[a[u]],i),i.normalize();let f=!1;for(let o=0;o!==n.length;o++)if(n[o].almostEquals(i)||n[o].almostEquals(i)){f=!0;break}f||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let e=0;e<this.faces.length;e++){for(let i=0;i<this.faces[e].length;i++)if(!this.vertices[this.faces[e][i]])throw new Error(`Vertex ${this.faces[e][i]} not found!`);const t=this.faceNormals[e]||new y;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;const n=this.vertices[this.faces[e][0]];if(t.dot(n)<0){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[e].length;i++)console.warn(`.vertices[${this.faces[e][i]}] = Vec3(${this.vertices[this.faces[e][i]].toString()})`)}}}getFaceNormal(e,t){const n=this.faces[e],i=this.vertices[n[0]],s=this.vertices[n[1]],a=this.vertices[n[2]];Fi.computeNormal(i,s,a,t)}static computeNormal(e,t,n,i){const s=new y,a=new y;t.vsub(e,a),n.vsub(t,s),s.cross(a,i),i.isZero()||i.normalize()}clipAgainstHull(e,t,n,i,s,a,l,h,u){const f=new y;let o=-1,c=-Number.MAX_VALUE;for(let m=0;m<n.faces.length;m++){f.copy(n.faceNormals[m]),s.vmult(f,f);const g=f.dot(a);g>c&&(c=g,o=m)}const d=[];for(let m=0;m<n.faces[o].length;m++){const g=n.vertices[n.faces[o][m]],_=new y;_.copy(g),s.vmult(_,_),i.vadd(_,_),d.push(_)}o>=0&&this.clipFaceAgainstHull(a,e,t,d,l,h,u)}findSeparatingAxis(e,t,n,i,s,a,l,h){const u=new y,f=new y,o=new y,c=new y,d=new y,m=new y;let g=Number.MAX_VALUE;const _=this;if(_.uniqueAxes)for(let p=0;p!==_.uniqueAxes.length;p++){n.vmult(_.uniqueAxes[p],u);const v=_.testSepAxis(u,e,t,n,i,s);if(v===!1)return!1;v<g&&(g=v,a.copy(u))}else{const p=l?l.length:_.faces.length;for(let v=0;v<p;v++){const x=l?l[v]:v;u.copy(_.faceNormals[x]),n.vmult(u,u);const S=_.testSepAxis(u,e,t,n,i,s);if(S===!1)return!1;S<g&&(g=S,a.copy(u))}}if(e.uniqueAxes)for(let p=0;p!==e.uniqueAxes.length;p++){s.vmult(e.uniqueAxes[p],f);const v=_.testSepAxis(f,e,t,n,i,s);if(v===!1)return!1;v<g&&(g=v,a.copy(f))}else{const p=h?h.length:e.faces.length;for(let v=0;v<p;v++){const x=h?h[v]:v;f.copy(e.faceNormals[x]),s.vmult(f,f);const S=_.testSepAxis(f,e,t,n,i,s);if(S===!1)return!1;S<g&&(g=S,a.copy(f))}}for(let p=0;p!==_.uniqueEdges.length;p++){n.vmult(_.uniqueEdges[p],c);for(let v=0;v!==e.uniqueEdges.length;v++)if(s.vmult(e.uniqueEdges[v],d),c.cross(d,m),!m.almostZero()){m.normalize();const x=_.testSepAxis(m,e,t,n,i,s);if(x===!1)return!1;x<g&&(g=x,a.copy(m))}}return i.vsub(t,o),o.dot(a)>0&&a.negate(a),!0}testSepAxis(e,t,n,i,s,a){const l=this;Fi.project(l,e,n,i,eo),Fi.project(t,e,s,a,to);const h=eo[0],u=eo[1],f=to[0],o=to[1];if(h<o||f<u)return!1;const c=h-o,d=f-u;return c<d?c:d}calculateLocalInertia(e,t){const n=new y,i=new y;this.computeLocalAABB(i,n);const s=n.x-i.x,a=n.y-i.y,l=n.z-i.z;t.x=1/12*e*(2*a*2*a+2*l*2*l),t.y=1/12*e*(2*s*2*s+2*l*2*l),t.z=1/12*e*(2*a*2*a+2*s*2*s)}getPlaneConstantOfFace(e){const t=this.faces[e],n=this.faceNormals[e],i=this.vertices[t[0]];return-n.dot(i)}clipFaceAgainstHull(e,t,n,i,s,a,l){const h=new y,u=new y,f=new y,o=new y,c=new y,d=new y,m=new y,g=new y,_=this,p=[],v=i,x=p;let S=-1,C=Number.MAX_VALUE;for(let E=0;E<_.faces.length;E++){h.copy(_.faceNormals[E]),n.vmult(h,h);const U=h.dot(e);U<C&&(C=U,S=E)}if(S<0)return;const w=_.faces[S];w.connectedFaces=[];for(let E=0;E<_.faces.length;E++)for(let U=0;U<_.faces[E].length;U++)w.indexOf(_.faces[E][U])!==-1&&E!==S&&w.connectedFaces.indexOf(E)===-1&&w.connectedFaces.push(E);const A=w.length;for(let E=0;E<A;E++){const U=_.vertices[w[E]],z=_.vertices[w[(E+1)%A]];U.vsub(z,u),f.copy(u),n.vmult(f,f),t.vadd(f,f),o.copy(this.faceNormals[S]),n.vmult(o,o),t.vadd(o,o),f.cross(o,c),c.negate(c),d.copy(U),n.vmult(d,d),t.vadd(d,d);const N=w.connectedFaces[E];m.copy(this.faceNormals[N]);const P=this.getPlaneConstantOfFace(N);g.copy(m),n.vmult(g,g);const L=P-g.dot(t);for(this.clipFaceAgainstPlane(v,x,g,L);v.length;)v.shift();for(;x.length;)v.push(x.shift())}m.copy(this.faceNormals[S]);const O=this.getPlaneConstantOfFace(S);g.copy(m),n.vmult(g,g);const M=O-g.dot(t);for(let E=0;E<v.length;E++){let U=g.dot(v[E])+M;if(U<=s&&(console.log(`clamped: depth=${U} to minDist=${s}`),U=s),U<=a){const z=v[E];if(U<=1e-6){const N={point:z,normal:g,depth:U};l.push(N)}}}}clipFaceAgainstPlane(e,t,n,i){let s,a;const l=e.length;if(l<2)return t;let h=e[e.length-1],u=e[0];s=n.dot(h)+i;for(let f=0;f<l;f++){if(u=e[f],a=n.dot(u)+i,s<0)if(a<0){const o=new y;o.copy(u),t.push(o)}else{const o=new y;h.lerp(u,s/(s-a),o),t.push(o)}else if(a<0){const o=new y;h.lerp(u,s/(s-a),o),t.push(o),t.push(u)}h=u,s=a}return t}computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new y);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)t.vmult(n[s],i[s]),e.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){const n=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<e.x?e.x=s.x:s.x>t.x&&(t.x=s.x),s.y<e.y?e.y=s.y:s.y>t.y&&(t.y=s.y),s.z<e.z?e.z=s.z:s.z>t.z&&(t.z=s.z)}}computeWorldFaceNormals(e){const t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new y);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==t;s++)e.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let e=0;const t=this.vertices;for(let n=0;n!==t.length;n++){const i=t[n].lengthSquared();i>e&&(e=i)}this.boundingSphereRadius=Math.sqrt(e)}calculateWorldAABB(e,t,n,i){const s=this.vertices;let a,l,h,u,f,o,c=new y;for(let d=0;d<s.length;d++){c.copy(s[d]),t.vmult(c,c),e.vadd(c,c);const m=c;(a===void 0||m.x<a)&&(a=m.x),(u===void 0||m.x>u)&&(u=m.x),(l===void 0||m.y<l)&&(l=m.y),(f===void 0||m.y>f)&&(f=m.y),(h===void 0||m.z<h)&&(h=m.z),(o===void 0||m.z>o)&&(o=m.z)}n.set(a,l,h),i.set(u,f,o)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(e){e===void 0&&(e=new y);const t=this.vertices;for(let n=0;n<t.length;n++)e.vadd(t[n],e);return e.scale(1/t.length,e),e}transformAllPoints(e,t){const n=this.vertices.length,i=this.vertices;if(t){for(let s=0;s<n;s++){const a=i[s];t.vmult(a,a)}for(let s=0;s<this.faceNormals.length;s++){const a=this.faceNormals[s];t.vmult(a,a)}}if(e)for(let s=0;s<n;s++){const a=i[s];a.vadd(e,a)}}pointIsInside(e){const t=this.vertices,n=this.faces,i=this.faceNormals,s=new y;this.getAveragePointLocal(s);for(let a=0;a<this.faces.length;a++){let l=i[a];const h=t[n[a][0]],u=new y;e.vsub(h,u);const f=l.dot(u),o=new y;s.vsub(h,o);const c=l.dot(o);if(f<0&&c>0||f>0&&c<0)return!1}return-1}static project(e,t,n,i,s){const a=e.vertices.length,l=M_;let h=0,u=0;const f=S_,o=e.vertices;f.setZero(),Xe.vectorToLocalFrame(n,i,t,l),Xe.pointToLocalFrame(n,i,f,f);const c=f.dot(l);u=h=o[0].dot(l);for(let d=1;d<a;d++){const m=o[d].dot(l);m>h&&(h=m),m<u&&(u=m)}if(u-=c,h-=c,u>h){const d=u;u=h,h=d}s[0]=h,s[1]=u}}const eo=[],to=[];new y;const M_=new y,S_=new y;class ms extends ue{constructor(e){super({type:ue.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const e=this.halfExtents.x,t=this.halfExtents.y,n=this.halfExtents.z,i=y,s=[new i(-e,-t,-n),new i(e,-t,-n),new i(e,t,-n),new i(-e,t,-n),new i(-e,-t,n),new i(e,-t,n),new i(e,t,n),new i(-e,t,n)],a=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],l=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],h=new Fi({vertices:s,faces:a,axes:l});this.convexPolyhedronRepresentation=h,h.material=this.material}calculateLocalInertia(e,t){return t===void 0&&(t=new y),ms.calculateInertia(this.halfExtents,e,t),t}static calculateInertia(e,t,n){const i=e;n.x=1/12*t*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*t*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*t*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(e,t){const n=e,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),t!==void 0)for(let s=0;s!==n.length;s++)t.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(e,t,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let a=0;a<s.length;a++)Cn.set(s[a][0],s[a][1],s[a][2]),t.vmult(Cn,Cn),e.vadd(Cn,Cn),n(Cn.x,Cn.y,Cn.z)}calculateWorldAABB(e,t,n,i){const s=this.halfExtents;nn[0].set(s.x,s.y,s.z),nn[1].set(-s.x,s.y,s.z),nn[2].set(-s.x,-s.y,s.z),nn[3].set(-s.x,-s.y,-s.z),nn[4].set(s.x,-s.y,-s.z),nn[5].set(s.x,s.y,-s.z),nn[6].set(-s.x,s.y,-s.z),nn[7].set(s.x,-s.y,s.z);const a=nn[0];t.vmult(a,a),e.vadd(a,a),i.copy(a),n.copy(a);for(let l=1;l<8;l++){const h=nn[l];t.vmult(h,h),e.vadd(h,h);const u=h.x,f=h.y,o=h.z;u>i.x&&(i.x=u),f>i.y&&(i.y=f),o>i.z&&(i.z=o),u<n.x&&(n.x=u),f<n.y&&(n.y=f),o<n.z&&(n.z=o)}}}const Cn=new y,nn=[new y,new y,new y,new y,new y,new y,new y,new y],Uo={DYNAMIC:1,STATIC:2,KINEMATIC:4},No={AWAKE:0,SLEEPY:1,SLEEPING:2};class ce extends bc{constructor(e){e===void 0&&(e={}),super(),this.id=ce.idCounter++,this.index=-1,this.world=null,this.vlambda=new y,this.collisionFilterGroup=typeof e.collisionFilterGroup=="number"?e.collisionFilterGroup:1,this.collisionFilterMask=typeof e.collisionFilterMask=="number"?e.collisionFilterMask:-1,this.collisionResponse=typeof e.collisionResponse=="boolean"?e.collisionResponse:!0,this.position=new y,this.previousPosition=new y,this.interpolatedPosition=new y,this.initPosition=new y,e.position&&(this.position.copy(e.position),this.previousPosition.copy(e.position),this.interpolatedPosition.copy(e.position),this.initPosition.copy(e.position)),this.velocity=new y,e.velocity&&this.velocity.copy(e.velocity),this.initVelocity=new y,this.force=new y;const t=typeof e.mass=="number"?e.mass:0;this.mass=t,this.invMass=t>0?1/t:0,this.material=e.material||null,this.linearDamping=typeof e.linearDamping=="number"?e.linearDamping:.01,this.type=t<=0?ce.STATIC:ce.DYNAMIC,typeof e.type==typeof ce.STATIC&&(this.type=e.type),this.allowSleep=typeof e.allowSleep<"u"?e.allowSleep:!0,this.sleepState=ce.AWAKE,this.sleepSpeedLimit=typeof e.sleepSpeedLimit<"u"?e.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof e.sleepTimeLimit<"u"?e.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new y,this.quaternion=new lt,this.initQuaternion=new lt,this.previousQuaternion=new lt,this.interpolatedQuaternion=new lt,e.quaternion&&(this.quaternion.copy(e.quaternion),this.initQuaternion.copy(e.quaternion),this.previousQuaternion.copy(e.quaternion),this.interpolatedQuaternion.copy(e.quaternion)),this.angularVelocity=new y,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),this.initAngularVelocity=new y,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new y,this.invInertia=new y,this.invInertiaWorld=new en,this.invMassSolve=0,this.invInertiaSolve=new y,this.invInertiaWorldSolve=new en,this.fixedRotation=typeof e.fixedRotation<"u"?e.fixedRotation:!1,this.angularDamping=typeof e.angularDamping<"u"?e.angularDamping:.01,this.linearFactor=new y(1,1,1),e.linearFactor&&this.linearFactor.copy(e.linearFactor),this.angularFactor=new y(1,1,1),e.angularFactor&&this.angularFactor.copy(e.angularFactor),this.aabb=new Gt,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new y,this.isTrigger=!!e.isTrigger,e.shape&&this.addShape(e.shape),this.updateMassProperties()}wakeUp(){const e=this.sleepState;this.sleepState=ce.AWAKE,this.wakeUpAfterNarrowphase=!1,e===ce.SLEEPING&&this.dispatchEvent(ce.wakeupEvent)}sleep(){this.sleepState=ce.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(e){if(this.allowSleep){const t=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;t===ce.AWAKE&&n<i?(this.sleepState=ce.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(ce.sleepyEvent)):t===ce.SLEEPY&&n>i?this.wakeUp():t===ce.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(ce.sleepEvent))}}updateSolveMassProperties(){this.sleepState===ce.SLEEPING||this.type===ce.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(e,t){return t===void 0&&(t=new y),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}vectorToLocalFrame(e,t){return t===void 0&&(t=new y),this.quaternion.conjugate().vmult(e,t),t}pointToWorldFrame(e,t){return t===void 0&&(t=new y),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}vectorToWorldFrame(e,t){return t===void 0&&(t=new y),this.quaternion.vmult(e,t),t}addShape(e,t,n){const i=new y,s=new lt;return t&&i.copy(t),n&&s.copy(n),this.shapes.push(e),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}removeShape(e){const t=this.shapes.indexOf(e);return t===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null,this)}updateBoundingRadius(){const e=this.shapes,t=this.shapeOffsets,n=e.length;let i=0;for(let s=0;s!==n;s++){const a=e[s];a.updateBoundingSphereRadius();const l=t[s].length(),h=a.boundingSphereRadius;l+h>i&&(i=l+h)}this.boundingRadius=i}updateAABB(){const e=this.shapes,t=this.shapeOffsets,n=this.shapeOrientations,i=e.length,s=b_,a=E_,l=this.quaternion,h=this.aabb,u=w_;for(let f=0;f!==i;f++){const o=e[f];l.vmult(t[f],s),s.vadd(this.position,s),l.mult(n[f],a),o.calculateWorldAABB(s,a,u.lowerBound,u.upperBound),f===0?h.copy(u):h.extend(u)}this.aabbNeedsUpdate=!1}updateInertiaWorld(e){const t=this.invInertia;if(!(t.x===t.y&&t.y===t.z&&!e)){const n=T_,i=A_;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(t,n),n.mmult(i,this.invInertiaWorld)}}applyForce(e,t){if(t===void 0&&(t=new y),this.type!==ce.DYNAMIC)return;this.sleepState===ce.SLEEPING&&this.wakeUp();const n=R_;t.cross(e,n),this.force.vadd(e,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(e,t){if(t===void 0&&(t=new y),this.type!==ce.DYNAMIC)return;const n=C_,i=P_;this.vectorToWorldFrame(e,n),this.vectorToWorldFrame(t,i),this.applyForce(n,i)}applyTorque(e){this.type===ce.DYNAMIC&&(this.sleepState===ce.SLEEPING&&this.wakeUp(),this.torque.vadd(e,this.torque))}applyImpulse(e,t){if(t===void 0&&(t=new y),this.type!==ce.DYNAMIC)return;this.sleepState===ce.SLEEPING&&this.wakeUp();const n=t,i=L_;i.copy(e),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=I_;n.cross(e,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(e,t){if(t===void 0&&(t=new y),this.type!==ce.DYNAMIC)return;const n=D_,i=U_;this.vectorToWorldFrame(e,n),this.vectorToWorldFrame(t,i),this.applyImpulse(n,i)}updateMassProperties(){const e=N_;this.invMass=this.mass>0?1/this.mass:0;const t=this.inertia,n=this.fixedRotation;this.updateAABB(),e.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),ms.calculateInertia(e,this.mass,t),this.invInertia.set(t.x>0&&!n?1/t.x:0,t.y>0&&!n?1/t.y:0,t.z>0&&!n?1/t.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(e,t){const n=new y;return e.vsub(this.position,n),this.angularVelocity.cross(n,t),this.velocity.vadd(t,t),t}integrate(e,t,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===ce.DYNAMIC||this.type===ce.KINEMATIC)||this.sleepState===ce.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,a=this.position,l=this.force,h=this.torque,u=this.quaternion,f=this.invMass,o=this.invInertiaWorld,c=this.linearFactor,d=f*e;i.x+=l.x*d*c.x,i.y+=l.y*d*c.y,i.z+=l.z*d*c.z;const m=o.elements,g=this.angularFactor,_=h.x*g.x,p=h.y*g.y,v=h.z*g.z;s.x+=e*(m[0]*_+m[1]*p+m[2]*v),s.y+=e*(m[3]*_+m[4]*p+m[5]*v),s.z+=e*(m[6]*_+m[7]*p+m[8]*v),a.x+=i.x*e,a.y+=i.y*e,a.z+=i.z*e,u.integrate(this.angularVelocity,e,this.angularFactor,u),t&&(n?u.normalizeFast():u.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}ce.idCounter=0;ce.COLLIDE_EVENT_NAME="collide";ce.DYNAMIC=Uo.DYNAMIC;ce.STATIC=Uo.STATIC;ce.KINEMATIC=Uo.KINEMATIC;ce.AWAKE=No.AWAKE;ce.SLEEPY=No.SLEEPY;ce.SLEEPING=No.SLEEPING;ce.wakeupEvent={type:"wakeup"};ce.sleepyEvent={type:"sleepy"};ce.sleepEvent={type:"sleep"};const b_=new y,E_=new lt,w_=new Gt,T_=new en,A_=new en;new en;const R_=new y,C_=new y,P_=new y,L_=new y,I_=new y,D_=new y,U_=new y,N_=new y;class Ec{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(e,t,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(e,t){return!(!(e.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&e.collisionFilterMask)||(e.type&ce.STATIC||e.sleepState===ce.SLEEPING)&&(t.type&ce.STATIC||t.sleepState===ce.SLEEPING))}intersectionTest(e,t,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,n,i):this.doBoundingSphereBroadphase(e,t,n,i)}doBoundingSphereBroadphase(e,t,n,i){const s=F_;t.position.vsub(e.position,s);const a=(e.boundingRadius+t.boundingRadius)**2;s.lengthSquared()<a&&(n.push(e),i.push(t))}doBoundingBoxBroadphase(e,t,n,i){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(n.push(e),i.push(t))}makePairsUnique(e,t){const n=O_,i=B_,s=z_,a=e.length;for(let l=0;l!==a;l++)i[l]=e[l],s[l]=t[l];e.length=0,t.length=0;for(let l=0;l!==a;l++){const h=i[l].id,u=s[l].id,f=h<u?`${h},${u}`:`${u},${h}`;n[f]=l,n.keys.push(f)}for(let l=0;l!==n.keys.length;l++){const h=n.keys.pop(),u=n[h];e.push(i[u]),t.push(s[u]),delete n[h]}}setWorld(e){}static boundingSphereCheck(e,t){const n=new y;e.position.vsub(t.position,n);const i=e.shapes[0],s=t.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(e,t,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const F_=new y;new y;new lt;new y;const O_={keys:[]},B_=[],z_=[];new y;new y;new y;class H_ extends Ec{constructor(){super()}collisionPairs(e,t,n){const i=e.bodies,s=i.length;let a,l;for(let h=0;h!==s;h++)for(let u=0;u!==h;u++)a=i[h],l=i[u],this.needBroadphaseCollision(a,l)&&this.intersectionTest(a,l,t,n)}aabbQuery(e,t,n){n===void 0&&(n=[]);for(let i=0;i<e.bodies.length;i++){const s=e.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(t)&&n.push(s)}return n}}class lr{constructor(){this.rayFromWorld=new y,this.rayToWorld=new y,this.hitNormalWorld=new y,this.hitPointWorld=new y,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,n,i,s,a,l){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=a,this.distance=l}}let wc,Tc,Ac,Rc,Cc,Pc,Lc;const Fo={CLOSEST:1,ANY:2,ALL:4};wc=ue.types.SPHERE;Tc=ue.types.PLANE;Ac=ue.types.BOX;Rc=ue.types.CYLINDER;Cc=ue.types.CONVEXPOLYHEDRON;Pc=ue.types.HEIGHTFIELD;Lc=ue.types.TRIMESH;class ht{get[wc](){return this._intersectSphere}get[Tc](){return this._intersectPlane}get[Ac](){return this._intersectBox}get[Rc](){return this._intersectConvex}get[Cc](){return this._intersectConvex}get[Pc](){return this._intersectHeightfield}get[Lc](){return this._intersectTrimesh}constructor(e,t){e===void 0&&(e=new y),t===void 0&&(t=new y),this.from=e.clone(),this.to=t.clone(),this.direction=new y,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=ht.ANY,this.result=new lr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(e,t){return this.mode=t.mode||ht.ANY,this.result=t.result||new lr,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=typeof t.collisionFilterMask<"u"?t.collisionFilterMask:-1,this.collisionFilterGroup=typeof t.collisionFilterGroup<"u"?t.collisionFilterGroup:-1,this.checkCollisionResponse=typeof t.checkCollisionResponse<"u"?t.checkCollisionResponse:!0,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Sl),no.length=0,e.broadphase.aabbQuery(e,Sl,no),this.intersectBodies(no),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!e.collisionResponse||!(this.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&this.collisionFilterMask))return;const i=G_,s=k_;for(let a=0,l=e.shapes.length;a<l;a++){const h=e.shapes[a];if(!(n&&!h.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[a],s),e.quaternion.vmult(e.shapeOffsets[a],i),i.vadd(e.position,i),this.intersectShape(h,s,i,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let n=0,i=e.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(e[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,n,i){const s=this.from;if(ng(s,this.direction,n)>e.boundingSphereRadius)return;const l=this[e.type];l&&l.call(this,e,t,n,i,e)}_intersectBox(e,t,n,i,s){return this._intersectConvex(e.convexPolyhedronRepresentation,t,n,i,s)}_intersectPlane(e,t,n,i,s){const a=this.from,l=this.to,h=this.direction,u=new y(0,0,1);t.vmult(u,u);const f=new y;a.vsub(n,f);const o=f.dot(u);l.vsub(n,f);const c=f.dot(u);if(o*c>0||a.distanceTo(l)<o)return;const d=u.dot(h);if(Math.abs(d)<this.precision)return;const m=new y,g=new y,_=new y;a.vsub(n,m);const p=-u.dot(m)/d;h.scale(p,g),a.vadd(g,_),this.reportIntersection(u,_,s,i,-1)}getAABB(e){const{lowerBound:t,upperBound:n}=e,i=this.to,s=this.from;t.x=Math.min(i.x,s.x),t.y=Math.min(i.y,s.y),t.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(e,t,n,i,s){e.data,e.elementSize;const a=V_;a.from.copy(this.from),a.to.copy(this.to),Xe.pointToLocalFrame(n,t,a.from,a.from),Xe.pointToLocalFrame(n,t,a.to,a.to),a.updateDirection();const l=W_;let h,u,f,o;h=u=0,f=o=e.data.length-1;const c=new Gt;a.getAABB(c),e.getIndexOfPosition(c.lowerBound.x,c.lowerBound.y,l,!0),h=Math.max(h,l[0]),u=Math.max(u,l[1]),e.getIndexOfPosition(c.upperBound.x,c.upperBound.y,l,!0),f=Math.min(f,l[0]+1),o=Math.min(o,l[1]+1);for(let d=h;d<f;d++)for(let m=u;m<o;m++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(d,m,c),!!c.overlapsRay(a)){if(e.getConvexTrianglePillar(d,m,!1),Xe.pointToWorldFrame(n,t,e.pillarOffset,qs),this._intersectConvex(e.pillarConvex,t,qs,i,s,bl),this.result.shouldStop)return;e.getConvexTrianglePillar(d,m,!0),Xe.pointToWorldFrame(n,t,e.pillarOffset,qs),this._intersectConvex(e.pillarConvex,t,qs,i,s,bl)}}}_intersectSphere(e,t,n,i,s){const a=this.from,l=this.to,h=e.radius,u=(l.x-a.x)**2+(l.y-a.y)**2+(l.z-a.z)**2,f=2*((l.x-a.x)*(a.x-n.x)+(l.y-a.y)*(a.y-n.y)+(l.z-a.z)*(a.z-n.z)),o=(a.x-n.x)**2+(a.y-n.y)**2+(a.z-n.z)**2-h**2,c=f**2-4*u*o,d=X_,m=q_;if(!(c<0))if(c===0)a.lerp(l,c,d),d.vsub(n,m),m.normalize(),this.reportIntersection(m,d,s,i,-1);else{const g=(-f-Math.sqrt(c))/(2*u),_=(-f+Math.sqrt(c))/(2*u);if(g>=0&&g<=1&&(a.lerp(l,g,d),d.vsub(n,m),m.normalize(),this.reportIntersection(m,d,s,i,-1)),this.result.shouldStop)return;_>=0&&_<=1&&(a.lerp(l,_,d),d.vsub(n,m),m.normalize(),this.reportIntersection(m,d,s,i,-1))}}_intersectConvex(e,t,n,i,s,a){const l=Y_,h=El,u=a&&a.faceList||null,f=e.faces,o=e.vertices,c=e.faceNormals,d=this.direction,m=this.from,g=this.to,_=m.distanceTo(g),p=u?u.length:f.length,v=this.result;for(let x=0;!v.shouldStop&&x<p;x++){const S=u?u[x]:x,C=f[S],w=c[S],A=t,O=n;h.copy(o[C[0]]),A.vmult(h,h),h.vadd(O,h),h.vsub(m,h),A.vmult(w,l);const M=d.dot(l);if(Math.abs(M)<this.precision)continue;const E=l.dot(h)/M;if(!(E<0)){d.scale(E,Lt),Lt.vadd(m,Lt),Zt.copy(o[C[0]]),A.vmult(Zt,Zt),O.vadd(Zt,Zt);for(let U=1;!v.shouldStop&&U<C.length-1;U++){sn.copy(o[C[U]]),rn.copy(o[C[U+1]]),A.vmult(sn,sn),A.vmult(rn,rn),O.vadd(sn,sn),O.vadd(rn,rn);const z=Lt.distanceTo(m);!(ht.pointInTriangle(Lt,Zt,sn,rn)||ht.pointInTriangle(Lt,sn,Zt,rn))||z>_||this.reportIntersection(l,Lt,s,i,S)}}}}_intersectTrimesh(e,t,n,i,s,a){const l=j_,h=eg,u=tg,f=El,o=$_,c=Z_,d=K_,m=Q_,g=J_,_=e.indices;e.vertices;const p=this.from,v=this.to,x=this.direction;u.position.copy(n),u.quaternion.copy(t),Xe.vectorToLocalFrame(n,t,x,o),Xe.pointToLocalFrame(n,t,p,c),Xe.pointToLocalFrame(n,t,v,d),d.x*=e.scale.x,d.y*=e.scale.y,d.z*=e.scale.z,c.x*=e.scale.x,c.y*=e.scale.y,c.z*=e.scale.z,d.vsub(c,o),o.normalize();const S=c.distanceSquared(d);e.tree.rayQuery(this,u,h);for(let C=0,w=h.length;!this.result.shouldStop&&C!==w;C++){const A=h[C];e.getNormal(A,l),e.getVertex(_[A*3],Zt),Zt.vsub(c,f);const O=o.dot(l),M=l.dot(f)/O;if(M<0)continue;o.scale(M,Lt),Lt.vadd(c,Lt),e.getVertex(_[A*3+1],sn),e.getVertex(_[A*3+2],rn);const E=Lt.distanceSquared(c);!(ht.pointInTriangle(Lt,sn,Zt,rn)||ht.pointInTriangle(Lt,Zt,sn,rn))||E>S||(Xe.vectorToWorldFrame(t,l,g),Xe.pointToWorldFrame(n,t,Lt,m),this.reportIntersection(g,m,s,i,A))}h.length=0}reportIntersection(e,t,n,i,s){const a=this.from,l=this.to,h=a.distanceTo(t),u=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(u.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case ht.ALL:this.hasHit=!0,u.set(a,l,e,t,n,i,h),u.hasHit=!0,this.callback(u);break;case ht.CLOSEST:(h<u.distance||!u.hasHit)&&(this.hasHit=!0,u.hasHit=!0,u.set(a,l,e,t,n,i,h));break;case ht.ANY:this.hasHit=!0,u.hasHit=!0,u.set(a,l,e,t,n,i,h),u.shouldStop=!0;break}}static pointInTriangle(e,t,n,i){i.vsub(t,Kn),n.vsub(t,Qi),e.vsub(t,io);const s=Kn.dot(Kn),a=Kn.dot(Qi),l=Kn.dot(io),h=Qi.dot(Qi),u=Qi.dot(io);let f,o;return(f=h*l-a*u)>=0&&(o=s*u-a*l)>=0&&f+o<s*h-a*a}}ht.CLOSEST=Fo.CLOSEST;ht.ANY=Fo.ANY;ht.ALL=Fo.ALL;const Sl=new Gt,no=[],Qi=new y,io=new y,G_=new y,k_=new lt,Lt=new y,Zt=new y,sn=new y,rn=new y;new y;new lr;const bl={faceList:[0]},qs=new y,V_=new ht,W_=[],X_=new y,q_=new y,Y_=new y;new y;new y;const El=new y,j_=new y,$_=new y,Z_=new y,K_=new y,J_=new y,Q_=new y;new Gt;const eg=[],tg=new Xe,Kn=new y,Ys=new y;function ng(r,e,t){t.vsub(r,Kn);const n=Kn.dot(e);return e.scale(n,Ys),Ys.vadd(r,Ys),t.distanceTo(Ys)}class Ii extends Ec{static checkBounds(e,t,n){let i,s;n===0?(i=e.position.x,s=t.position.x):n===1?(i=e.position.y,s=t.position.y):n===2&&(i=e.position.z,s=t.position.z);const a=e.boundingRadius,l=t.boundingRadius,h=i+a;return s-l<h}static insertionSortX(e){for(let t=1,n=e.length;t<n;t++){const i=e[t];let s;for(s=t-1;s>=0&&!(e[s].aabb.lowerBound.x<=i.aabb.lowerBound.x);s--)e[s+1]=e[s];e[s+1]=i}return e}static insertionSortY(e){for(let t=1,n=e.length;t<n;t++){const i=e[t];let s;for(s=t-1;s>=0&&!(e[s].aabb.lowerBound.y<=i.aabb.lowerBound.y);s--)e[s+1]=e[s];e[s+1]=i}return e}static insertionSortZ(e){for(let t=1,n=e.length;t<n;t++){const i=e[t];let s;for(s=t-1;s>=0&&!(e[s].aabb.lowerBound.z<=i.aabb.lowerBound.z);s--)e[s+1]=e[s];e[s+1]=i}return e}constructor(e){super(),this.axisList=[],this.world=null,this.axisIndex=0;const t=this.axisList;this._addBodyHandler=n=>{t.push(n.body)},this._removeBodyHandler=n=>{const i=t.indexOf(n.body);i!==-1&&t.splice(i,1)},e&&this.setWorld(e)}setWorld(e){this.axisList.length=0;for(let t=0;t<e.bodies.length;t++)this.axisList.push(e.bodies[t]);e.removeEventListener("addBody",this._addBodyHandler),e.removeEventListener("removeBody",this._removeBodyHandler),e.addEventListener("addBody",this._addBodyHandler),e.addEventListener("removeBody",this._removeBodyHandler),this.world=e,this.dirty=!0}collisionPairs(e,t,n){const i=this.axisList,s=i.length,a=this.axisIndex;let l,h;for(this.dirty&&(this.sortList(),this.dirty=!1),l=0;l!==s;l++){const u=i[l];for(h=l+1;h<s;h++){const f=i[h];if(this.needBroadphaseCollision(u,f)){if(!Ii.checkBounds(u,f,a))break;this.intersectionTest(u,f,t,n)}}}}sortList(){const e=this.axisList,t=this.axisIndex,n=e.length;for(let i=0;i!==n;i++){const s=e[i];s.aabbNeedsUpdate&&s.updateAABB()}t===0?Ii.insertionSortX(e):t===1?Ii.insertionSortY(e):t===2&&Ii.insertionSortZ(e)}autoDetectAxis(){let e=0,t=0,n=0,i=0,s=0,a=0;const l=this.axisList,h=l.length,u=1/h;for(let d=0;d!==h;d++){const m=l[d],g=m.position.x;e+=g,t+=g*g;const _=m.position.y;n+=_,i+=_*_;const p=m.position.z;s+=p,a+=p*p}const f=t-e*e*u,o=i-n*n*u,c=a-s*s*u;f>o?f>c?this.axisIndex=0:this.axisIndex=2:o>c?this.axisIndex=1:this.axisIndex=2}aabbQuery(e,t,n){n===void 0&&(n=[]),this.dirty&&(this.sortList(),this.dirty=!1);const i=this.axisIndex;let s="x";i===1&&(s="y"),i===2&&(s="z");const a=this.axisList;t.lowerBound[s],t.upperBound[s];for(let l=0;l<a.length;l++){const h=a[l];h.aabbNeedsUpdate&&h.updateAABB(),h.aabb.overlaps(t)&&n.push(h)}return n}}class ig{static defaults(e,t){e===void 0&&(e={});for(let n in t)n in e||(e[n]=t[n]);return e}}class wl{constructor(){this.spatial=new y,this.rotational=new y}multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}}class _s{constructor(e,t,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=_s.idCounter++,this.minForce=n,this.maxForce=i,this.bi=e,this.bj=t,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new wl,this.jacobianElementB=new wl,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(e,t,n){const i=t,s=e,a=n;this.a=4/(a*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(a*a*s*(1+4*i))}computeB(e,t,n){const i=this.computeGW(),s=this.computeGq(),a=this.computeGiMf();return-s*e-i*t-a*n}computeGq(){const e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,a=i.position;return e.spatial.dot(s)+t.spatial.dot(a)}computeGW(){const e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,a=i.velocity,l=n.angularVelocity,h=i.angularVelocity;return e.multiplyVectors(s,l)+t.multiplyVectors(a,h)}computeGWlambda(){const e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,a=i.vlambda,l=n.wlambda,h=i.wlambda;return e.multiplyVectors(s,l)+t.multiplyVectors(a,h)}computeGiMf(){const e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,a=n.torque,l=i.force,h=i.torque,u=n.invMassSolve,f=i.invMassSolve;return s.scale(u,Tl),l.scale(f,Al),n.invInertiaWorldSolve.vmult(a,Rl),i.invInertiaWorldSolve.vmult(h,Cl),e.multiplyVectors(Tl,Rl)+t.multiplyVectors(Al,Cl)}computeGiMGt(){const e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,a=i.invMassSolve,l=n.invInertiaWorldSolve,h=i.invInertiaWorldSolve;let u=s+a;return l.vmult(e.rotational,js),u+=js.dot(e.rotational),h.vmult(t.rotational,js),u+=js.dot(t.rotational),u}addToWlambda(e){const t=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,a=sg;i.vlambda.addScaledVector(i.invMassSolve*e,t.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*e,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(t.rotational,a),i.wlambda.addScaledVector(e,a,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,a),s.wlambda.addScaledVector(e,a,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}_s.idCounter=0;const Tl=new y,Al=new y,Rl=new y,Cl=new y,js=new y,sg=new y;class rg extends _s{constructor(e,t,n){n===void 0&&(n=1e6),super(e,t,0,n),this.restitution=0,this.ri=new y,this.rj=new y,this.ni=new y}computeB(e){const t=this.a,n=this.b,i=this.bi,s=this.bj,a=this.ri,l=this.rj,h=og,u=ag,f=i.velocity,o=i.angularVelocity;i.force,i.torque;const c=s.velocity,d=s.angularVelocity;s.force,s.torque;const m=lg,g=this.jacobianElementA,_=this.jacobianElementB,p=this.ni;a.cross(p,h),l.cross(p,u),p.negate(g.spatial),h.negate(g.rotational),_.spatial.copy(p),_.rotational.copy(u),m.copy(s.position),m.vadd(l,m),m.vsub(i.position,m),m.vsub(a,m);const v=p.dot(m),x=this.restitution+1,S=x*c.dot(p)-x*f.dot(p)+d.dot(u)-o.dot(h),C=this.computeGiMf();return-v*t-S*n-e*C}getImpactVelocityAlongNormal(){const e=cg,t=hg,n=ug,i=dg,s=fg;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,e),this.bj.getVelocityAtWorldPoint(i,t),e.vsub(t,s),this.ni.dot(s)}}const og=new y,ag=new y,lg=new y,cg=new y,hg=new y,ug=new y,dg=new y,fg=new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;class Pl extends _s{constructor(e,t,n){super(e,t,-n,n),this.ri=new y,this.rj=new y,this.t=new y}computeB(e){this.a;const t=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=pg,a=mg,l=this.t;n.cross(l,s),i.cross(l,a);const h=this.jacobianElementA,u=this.jacobianElementB;l.negate(h.spatial),s.negate(h.rotational),u.spatial.copy(l),u.rotational.copy(a);const f=this.computeGW(),o=this.computeGiMf();return-f*t-e*o}}const pg=new y,mg=new y;class ni{constructor(e,t,n){n=ig.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=ni.idCounter++,this.materials=[e,t],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}ni.idCounter=0;class Dn{constructor(e){e===void 0&&(e={});let t="";typeof e=="string"&&(t=e,e={}),this.name=t,this.id=Dn.idCounter++,this.friction=typeof e.friction<"u"?e.friction:-1,this.restitution=typeof e.restitution<"u"?e.restitution:-1}}Dn.idCounter=0;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new ht;new y;new y;new y;new y(1,0,0),new y(0,1,0),new y(0,0,1);new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;class so extends ue{constructor(e){if(super({type:ue.types.SPHERE}),this.radius=e!==void 0?e:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(e,t){t===void 0&&(t=new y);const n=2*e*this.radius*this.radius/5;return t.x=n,t.y=n,t.z=n,t}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(e,t,n,i){const s=this.radius,a=["x","y","z"];for(let l=0;l<a.length;l++){const h=a[l];n[h]=e[h]-s,i[h]=e[h]+s}}}new y;new y;new y;new y;new y;new y;new y;new y;new y;class _g extends Fi{constructor(e,t,n,i){if(e===void 0&&(e=1),t===void 0&&(t=1),n===void 0&&(n=1),i===void 0&&(i=8),e<0)throw new Error("The cylinder radiusTop cannot be negative.");if(t<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=i,a=[],l=[],h=[],u=[],f=[],o=Math.cos,c=Math.sin;a.push(new y(-t*c(0),-n*.5,t*o(0))),u.push(0),a.push(new y(-e*c(0),n*.5,e*o(0))),f.push(1);for(let m=0;m<s;m++){const g=2*Math.PI/s*(m+1),_=2*Math.PI/s*(m+.5);m<s-1?(a.push(new y(-t*c(g),-n*.5,t*o(g))),u.push(2*m+2),a.push(new y(-e*c(g),n*.5,e*o(g))),f.push(2*m+3),h.push([2*m,2*m+1,2*m+3,2*m+2])):h.push([2*m,2*m+1,1,0]),(s%2===1||m<s/2)&&l.push(new y(-c(_),0,o(_)))}h.push(u),l.push(new y(0,1,0));const d=[];for(let m=0;m<f.length;m++)d.push(f[f.length-m-1]);h.push(d),super({vertices:a,faces:h,axes:l}),this.type=ue.types.CYLINDER,this.radiusTop=e,this.radiusBottom=t,this.height=n,this.numSegments=i}}new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new Gt;new y;new Gt;new y;new y;new y;new y;new y;new y;new y;new Gt;new y;new Xe;new Gt;class gg{constructor(){this.equations=[]}solve(e,t){return 0}addEquation(e){e.enabled&&!e.bi.isTrigger&&!e.bj.isTrigger&&this.equations.push(e)}removeEquation(e){const t=this.equations,n=t.indexOf(e);n!==-1&&t.splice(n,1)}removeAllEquations(){this.equations.length=0}}class vg extends gg{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(e,t){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,a=this.equations,l=a.length,h=t.bodies,u=h.length,f=e;let o,c,d,m,g,_;if(l!==0)for(let S=0;S!==u;S++)h[S].updateSolveMassProperties();const p=yg,v=Mg,x=xg;p.length=l,v.length=l,x.length=l;for(let S=0;S!==l;S++){const C=a[S];x[S]=0,v[S]=C.computeB(f),p[S]=1/C.computeC()}if(l!==0){for(let w=0;w!==u;w++){const A=h[w],O=A.vlambda,M=A.wlambda;O.set(0,0,0),M.set(0,0,0)}for(n=0;n!==i;n++){m=0;for(let w=0;w!==l;w++){const A=a[w];o=v[w],c=p[w],_=x[w],g=A.computeGWlambda(),d=c*(o-g-A.eps*_),_+d<A.minForce?d=A.minForce-_:_+d>A.maxForce&&(d=A.maxForce-_),x[w]+=d,m+=d>0?d:-d,A.addToWlambda(d)}if(m*m<s)break}for(let w=0;w!==u;w++){const A=h[w],O=A.velocity,M=A.angularVelocity;A.vlambda.vmul(A.linearFactor,A.vlambda),O.vadd(A.vlambda,O),A.wlambda.vmul(A.angularFactor,A.wlambda),M.vadd(A.wlambda,M)}let S=a.length;const C=1/f;for(;S--;)a[S].multiplier=x[S]*C}return n}}const xg=[],yg=[],Mg=[];class Sg{constructor(){this.objects=[],this.type=Object}release(){const e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(e){const t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}}class bg extends Sg{constructor(){super(...arguments),this.type=y}constructObject(){return new y}}const Qe={sphereSphere:ue.types.SPHERE,spherePlane:ue.types.SPHERE|ue.types.PLANE,boxBox:ue.types.BOX|ue.types.BOX,sphereBox:ue.types.SPHERE|ue.types.BOX,planeBox:ue.types.PLANE|ue.types.BOX,convexConvex:ue.types.CONVEXPOLYHEDRON,sphereConvex:ue.types.SPHERE|ue.types.CONVEXPOLYHEDRON,planeConvex:ue.types.PLANE|ue.types.CONVEXPOLYHEDRON,boxConvex:ue.types.BOX|ue.types.CONVEXPOLYHEDRON,sphereHeightfield:ue.types.SPHERE|ue.types.HEIGHTFIELD,boxHeightfield:ue.types.BOX|ue.types.HEIGHTFIELD,convexHeightfield:ue.types.CONVEXPOLYHEDRON|ue.types.HEIGHTFIELD,sphereParticle:ue.types.PARTICLE|ue.types.SPHERE,planeParticle:ue.types.PLANE|ue.types.PARTICLE,boxParticle:ue.types.BOX|ue.types.PARTICLE,convexParticle:ue.types.PARTICLE|ue.types.CONVEXPOLYHEDRON,cylinderCylinder:ue.types.CYLINDER,sphereCylinder:ue.types.SPHERE|ue.types.CYLINDER,planeCylinder:ue.types.PLANE|ue.types.CYLINDER,boxCylinder:ue.types.BOX|ue.types.CYLINDER,convexCylinder:ue.types.CONVEXPOLYHEDRON|ue.types.CYLINDER,heightfieldCylinder:ue.types.HEIGHTFIELD|ue.types.CYLINDER,particleCylinder:ue.types.PARTICLE|ue.types.CYLINDER,sphereTrimesh:ue.types.SPHERE|ue.types.TRIMESH,planeTrimesh:ue.types.PLANE|ue.types.TRIMESH};class Eg{get[Qe.sphereSphere](){return this.sphereSphere}get[Qe.spherePlane](){return this.spherePlane}get[Qe.boxBox](){return this.boxBox}get[Qe.sphereBox](){return this.sphereBox}get[Qe.planeBox](){return this.planeBox}get[Qe.convexConvex](){return this.convexConvex}get[Qe.sphereConvex](){return this.sphereConvex}get[Qe.planeConvex](){return this.planeConvex}get[Qe.boxConvex](){return this.boxConvex}get[Qe.sphereHeightfield](){return this.sphereHeightfield}get[Qe.boxHeightfield](){return this.boxHeightfield}get[Qe.convexHeightfield](){return this.convexHeightfield}get[Qe.sphereParticle](){return this.sphereParticle}get[Qe.planeParticle](){return this.planeParticle}get[Qe.boxParticle](){return this.boxParticle}get[Qe.convexParticle](){return this.convexParticle}get[Qe.cylinderCylinder](){return this.convexConvex}get[Qe.sphereCylinder](){return this.sphereConvex}get[Qe.planeCylinder](){return this.planeConvex}get[Qe.boxCylinder](){return this.boxConvex}get[Qe.convexCylinder](){return this.convexConvex}get[Qe.heightfieldCylinder](){return this.heightfieldCylinder}get[Qe.particleCylinder](){return this.particleCylinder}get[Qe.sphereTrimesh](){return this.sphereTrimesh}get[Qe.planeTrimesh](){return this.planeTrimesh}constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new bg,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(e,t,n,i,s,a){let l;this.contactPointPool.length?(l=this.contactPointPool.pop(),l.bi=e,l.bj=t):l=new rg(e,t),l.enabled=e.collisionResponse&&t.collisionResponse&&n.collisionResponse&&i.collisionResponse;const h=this.currentContactMaterial;l.restitution=h.restitution,l.setSpookParams(h.contactEquationStiffness,h.contactEquationRelaxation,this.world.dt);const u=n.material||e.material,f=i.material||t.material;return u&&f&&u.restitution>=0&&f.restitution>=0&&(l.restitution=u.restitution*f.restitution),l.si=s||n,l.sj=a||i,l}createFrictionEquationsFromContact(e,t){const n=e.bi,i=e.bj,s=e.si,a=e.sj,l=this.world,h=this.currentContactMaterial;let u=h.friction;const f=s.material||n.material,o=a.material||i.material;if(f&&o&&f.friction>=0&&o.friction>=0&&(u=f.friction*o.friction),u>0){const c=u*(l.frictionGravity||l.gravity).length();let d=n.invMass+i.invMass;d>0&&(d=1/d);const m=this.frictionEquationPool,g=m.length?m.pop():new Pl(n,i,c*d),_=m.length?m.pop():new Pl(n,i,c*d);return g.bi=_.bi=n,g.bj=_.bj=i,g.minForce=_.minForce=-c*d,g.maxForce=_.maxForce=c*d,g.ri.copy(e.ri),g.rj.copy(e.rj),_.ri.copy(e.ri),_.rj.copy(e.rj),e.ni.tangents(g.t,_.t),g.setSpookParams(h.frictionEquationStiffness,h.frictionEquationRelaxation,l.dt),_.setSpookParams(h.frictionEquationStiffness,h.frictionEquationRelaxation,l.dt),g.enabled=_.enabled=e.enabled,t.push(g,_),!0}return!1}createFrictionFromAverage(e){let t=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||e===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];Xn.setZero(),Ti.setZero(),Ai.setZero();const s=t.bi;t.bj;for(let l=0;l!==e;l++)t=this.result[this.result.length-1-l],t.bi!==s?(Xn.vadd(t.ni,Xn),Ti.vadd(t.ri,Ti),Ai.vadd(t.rj,Ai)):(Xn.vsub(t.ni,Xn),Ti.vadd(t.rj,Ti),Ai.vadd(t.ri,Ai));const a=1/e;Ti.scale(a,n.ri),Ai.scale(a,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),Xn.normalize(),Xn.tangents(n.t,i.t)}getContacts(e,t,n,i,s,a,l){this.contactPointPool=s,this.frictionEquationPool=l,this.result=i,this.frictionResult=a;const h=Ag,u=Rg,f=wg,o=Tg;for(let c=0,d=e.length;c!==d;c++){const m=e[c],g=t[c];let _=null;m.material&&g.material&&(_=n.getContactMaterial(m.material,g.material)||null);const p=m.type&ce.KINEMATIC&&g.type&ce.STATIC||m.type&ce.STATIC&&g.type&ce.KINEMATIC||m.type&ce.KINEMATIC&&g.type&ce.KINEMATIC;for(let v=0;v<m.shapes.length;v++){m.quaternion.mult(m.shapeOrientations[v],h),m.quaternion.vmult(m.shapeOffsets[v],f),f.vadd(m.position,f);const x=m.shapes[v];for(let S=0;S<g.shapes.length;S++){g.quaternion.mult(g.shapeOrientations[S],u),g.quaternion.vmult(g.shapeOffsets[S],o),o.vadd(g.position,o);const C=g.shapes[S];if(!(x.collisionFilterMask&C.collisionFilterGroup&&C.collisionFilterMask&x.collisionFilterGroup)||f.distanceTo(o)>x.boundingSphereRadius+C.boundingSphereRadius)continue;let w=null;x.material&&C.material&&(w=n.getContactMaterial(x.material,C.material)||null),this.currentContactMaterial=w||_||n.defaultContactMaterial;const A=x.type|C.type,O=this[A];if(O){let M=!1;x.type<C.type?M=O.call(this,x,C,f,o,h,u,m,g,x,C,p):M=O.call(this,C,x,o,f,u,h,g,m,x,C,p),M&&p&&(n.shapeOverlapKeeper.set(x.id,C.id),n.bodyOverlapKeeper.set(m.id,g.id))}}}}}sphereSphere(e,t,n,i,s,a,l,h,u,f,o){if(o)return n.distanceSquared(i)<(e.radius+t.radius)**2;const c=this.createContactEquation(l,h,e,t,u,f);i.vsub(n,c.ni),c.ni.normalize(),c.ri.copy(c.ni),c.rj.copy(c.ni),c.ri.scale(e.radius,c.ri),c.rj.scale(-t.radius,c.rj),c.ri.vadd(n,c.ri),c.ri.vsub(l.position,c.ri),c.rj.vadd(i,c.rj),c.rj.vsub(h.position,c.rj),this.result.push(c),this.createFrictionEquationsFromContact(c,this.frictionResult)}spherePlane(e,t,n,i,s,a,l,h,u,f,o){const c=this.createContactEquation(l,h,e,t,u,f);if(c.ni.set(0,0,1),a.vmult(c.ni,c.ni),c.ni.negate(c.ni),c.ni.normalize(),c.ni.scale(e.radius,c.ri),n.vsub(i,$s),c.ni.scale(c.ni.dot($s),Ll),$s.vsub(Ll,c.rj),-$s.dot(c.ni)<=e.radius){if(o)return!0;const d=c.ri,m=c.rj;d.vadd(n,d),d.vsub(l.position,d),m.vadd(i,m),m.vsub(h.position,m),this.result.push(c),this.createFrictionEquationsFromContact(c,this.frictionResult)}}boxBox(e,t,n,i,s,a,l,h,u,f,o){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,n,i,s,a,l,h,e,t,o)}sphereBox(e,t,n,i,s,a,l,h,u,f,o){const c=this.v3pool,d=e0;n.vsub(i,Zs),t.getSideNormals(d,a);const m=e.radius;let g=!1;const _=n0,p=i0,v=s0;let x=null,S=0,C=0,w=0,A=null;for(let I=0,j=d.length;I!==j&&g===!1;I++){const H=Kg;H.copy(d[I]);const G=H.length();H.normalize();const K=Zs.dot(H);if(K<G+m&&K>0){const Z=Jg,$=Qg;Z.copy(d[(I+1)%3]),$.copy(d[(I+2)%3]);const Y=Z.length(),J=$.length();Z.normalize(),$.normalize();const ae=Zs.dot(Z),pe=Zs.dot($);if(ae<Y&&ae>-Y&&pe<J&&pe>-J){const me=Math.abs(K-G-m);if((A===null||me<A)&&(A=me,C=ae,w=pe,x=G,_.copy(H),p.copy(Z),v.copy($),S++,o))return!0}}}if(S){g=!0;const I=this.createContactEquation(l,h,e,t,u,f);_.scale(-m,I.ri),I.ni.copy(_),I.ni.negate(I.ni),_.scale(x,_),p.scale(C,p),_.vadd(p,_),v.scale(w,v),_.vadd(v,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(l.position,I.ri),I.rj.vadd(i,I.rj),I.rj.vsub(h.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}let O=c.get();const M=t0;for(let I=0;I!==2&&!g;I++)for(let j=0;j!==2&&!g;j++)for(let H=0;H!==2&&!g;H++)if(O.set(0,0,0),I?O.vadd(d[0],O):O.vsub(d[0],O),j?O.vadd(d[1],O):O.vsub(d[1],O),H?O.vadd(d[2],O):O.vsub(d[2],O),i.vadd(O,M),M.vsub(n,M),M.lengthSquared()<m*m){if(o)return!0;g=!0;const G=this.createContactEquation(l,h,e,t,u,f);G.ri.copy(M),G.ri.normalize(),G.ni.copy(G.ri),G.ri.scale(m,G.ri),G.rj.copy(O),G.ri.vadd(n,G.ri),G.ri.vsub(l.position,G.ri),G.rj.vadd(i,G.rj),G.rj.vsub(h.position,G.rj),this.result.push(G),this.createFrictionEquationsFromContact(G,this.frictionResult)}c.release(O),O=null;const E=c.get(),U=c.get(),z=c.get(),N=c.get(),P=c.get(),L=d.length;for(let I=0;I!==L&&!g;I++)for(let j=0;j!==L&&!g;j++)if(I%3!==j%3){d[j].cross(d[I],E),E.normalize(),d[I].vadd(d[j],U),z.copy(n),z.vsub(U,z),z.vsub(i,z);const H=z.dot(E);E.scale(H,N);let G=0;for(;G===I%3||G===j%3;)G++;P.copy(n),P.vsub(N,P),P.vsub(U,P),P.vsub(i,P);const K=Math.abs(H),Z=P.length();if(K<d[G].length()&&Z<m){if(o)return!0;g=!0;const $=this.createContactEquation(l,h,e,t,u,f);U.vadd(N,$.rj),$.rj.copy($.rj),P.negate($.ni),$.ni.normalize(),$.ri.copy($.rj),$.ri.vadd(i,$.ri),$.ri.vsub(n,$.ri),$.ri.normalize(),$.ri.scale(m,$.ri),$.ri.vadd(n,$.ri),$.ri.vsub(l.position,$.ri),$.rj.vadd(i,$.rj),$.rj.vsub(h.position,$.rj),this.result.push($),this.createFrictionEquationsFromContact($,this.frictionResult)}}c.release(E,U,z,N,P)}planeBox(e,t,n,i,s,a,l,h,u,f,o){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,n,i,s,a,l,h,e,t,o)}convexConvex(e,t,n,i,s,a,l,h,u,f,o,c,d){const m=x0;if(!(n.distanceTo(i)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,n,s,i,a,m,c,d)){const g=[],_=y0;e.clipAgainstHull(n,s,t,i,a,m,-100,100,g);let p=0;for(let v=0;v!==g.length;v++){if(o)return!0;const x=this.createContactEquation(l,h,e,t,u,f),S=x.ri,C=x.rj;m.negate(x.ni),g[v].normal.negate(_),_.scale(g[v].depth,_),g[v].point.vadd(_,S),C.copy(g[v].point),S.vsub(n,S),C.vsub(i,C),S.vadd(n,S),S.vsub(l.position,S),C.vadd(i,C),C.vsub(h.position,C),this.result.push(x),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}}sphereConvex(e,t,n,i,s,a,l,h,u,f,o){const c=this.v3pool;n.vsub(i,r0);const d=t.faceNormals,m=t.faces,g=t.vertices,_=e.radius;let p=!1;for(let v=0;v!==g.length;v++){const x=g[v],S=c0;a.vmult(x,S),i.vadd(S,S);const C=l0;if(S.vsub(n,C),C.lengthSquared()<_*_){if(o)return!0;p=!0;const w=this.createContactEquation(l,h,e,t,u,f);w.ri.copy(C),w.ri.normalize(),w.ni.copy(w.ri),w.ri.scale(_,w.ri),S.vsub(i,w.rj),w.ri.vadd(n,w.ri),w.ri.vsub(l.position,w.ri),w.rj.vadd(i,w.rj),w.rj.vsub(h.position,w.rj),this.result.push(w),this.createFrictionEquationsFromContact(w,this.frictionResult);return}}for(let v=0,x=m.length;v!==x&&p===!1;v++){const S=d[v],C=m[v],w=h0;a.vmult(S,w);const A=u0;a.vmult(g[C[0]],A),A.vadd(i,A);const O=d0;w.scale(-_,O),n.vadd(O,O);const M=f0;O.vsub(A,M);const E=M.dot(w),U=p0;if(n.vsub(A,U),E<0&&U.dot(w)>0){const z=[];for(let N=0,P=C.length;N!==P;N++){const L=c.get();a.vmult(g[C[N]],L),i.vadd(L,L),z.push(L)}if(Zg(z,w,n)){if(o)return!0;p=!0;const N=this.createContactEquation(l,h,e,t,u,f);w.scale(-_,N.ri),w.negate(N.ni);const P=c.get();w.scale(-E,P);const L=c.get();w.scale(-_,L),n.vsub(i,N.rj),N.rj.vadd(L,N.rj),N.rj.vadd(P,N.rj),N.rj.vadd(i,N.rj),N.rj.vsub(h.position,N.rj),N.ri.vadd(n,N.ri),N.ri.vsub(l.position,N.ri),c.release(P),c.release(L),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult);for(let I=0,j=z.length;I!==j;I++)c.release(z[I]);return}else for(let N=0;N!==C.length;N++){const P=c.get(),L=c.get();a.vmult(g[C[(N+1)%C.length]],P),a.vmult(g[C[(N+2)%C.length]],L),i.vadd(P,P),i.vadd(L,L);const I=o0;L.vsub(P,I);const j=a0;I.unit(j);const H=c.get(),G=c.get();n.vsub(P,G);const K=G.dot(j);j.scale(K,H),H.vadd(P,H);const Z=c.get();if(H.vsub(n,Z),K>0&&K*K<I.lengthSquared()&&Z.lengthSquared()<_*_){if(o)return!0;const $=this.createContactEquation(l,h,e,t,u,f);H.vsub(i,$.rj),H.vsub(n,$.ni),$.ni.normalize(),$.ni.scale(_,$.ri),$.rj.vadd(i,$.rj),$.rj.vsub(h.position,$.rj),$.ri.vadd(n,$.ri),$.ri.vsub(l.position,$.ri),this.result.push($),this.createFrictionEquationsFromContact($,this.frictionResult);for(let Y=0,J=z.length;Y!==J;Y++)c.release(z[Y]);c.release(P),c.release(L),c.release(H),c.release(Z),c.release(G);return}c.release(P),c.release(L),c.release(H),c.release(Z),c.release(G)}for(let N=0,P=z.length;N!==P;N++)c.release(z[N])}}}planeConvex(e,t,n,i,s,a,l,h,u,f,o){const c=m0,d=_0;d.set(0,0,1),s.vmult(d,d);let m=0;const g=g0;for(let _=0;_!==t.vertices.length;_++)if(c.copy(t.vertices[_]),a.vmult(c,c),i.vadd(c,c),c.vsub(n,g),d.dot(g)<=0){if(o)return!0;const v=this.createContactEquation(l,h,e,t,u,f),x=v0;d.scale(d.dot(g),x),c.vsub(x,x),x.vsub(n,v.ri),v.ni.copy(d),c.vsub(i,v.rj),v.ri.vadd(n,v.ri),v.ri.vsub(l.position,v.ri),v.rj.vadd(i,v.rj),v.rj.vsub(h.position,v.rj),this.result.push(v),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}boxConvex(e,t,n,i,s,a,l,h,u,f,o){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,n,i,s,a,l,h,e,t,o)}sphereHeightfield(e,t,n,i,s,a,l,h,u,f,o){const c=t.data,d=e.radius,m=t.elementSize,g=I0,_=L0;Xe.pointToLocalFrame(i,a,n,_);let p=Math.floor((_.x-d)/m)-1,v=Math.ceil((_.x+d)/m)+1,x=Math.floor((_.y-d)/m)-1,S=Math.ceil((_.y+d)/m)+1;if(v<0||S<0||p>c.length||x>c[0].length)return;p<0&&(p=0),v<0&&(v=0),x<0&&(x=0),S<0&&(S=0),p>=c.length&&(p=c.length-1),v>=c.length&&(v=c.length-1),S>=c[0].length&&(S=c[0].length-1),x>=c[0].length&&(x=c[0].length-1);const C=[];t.getRectMinMax(p,x,v,S,C);const w=C[0],A=C[1];if(_.z-d>A||_.z+d<w)return;const O=this.result;for(let M=p;M<v;M++)for(let E=x;E<S;E++){const U=O.length;let z=!1;if(t.getConvexTrianglePillar(M,E,!1),Xe.pointToWorldFrame(i,a,t.pillarOffset,g),n.distanceTo(g)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(z=this.sphereConvex(e,t.pillarConvex,n,g,s,a,l,h,e,t,o)),o&&z||(t.getConvexTrianglePillar(M,E,!0),Xe.pointToWorldFrame(i,a,t.pillarOffset,g),n.distanceTo(g)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(z=this.sphereConvex(e,t.pillarConvex,n,g,s,a,l,h,e,t,o)),o&&z))return!0;if(O.length-U>2)return}}boxHeightfield(e,t,n,i,s,a,l,h,u,f,o){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,n,i,s,a,l,h,e,t,o)}convexHeightfield(e,t,n,i,s,a,l,h,u,f,o){const c=t.data,d=t.elementSize,m=e.boundingSphereRadius,g=C0,_=P0,p=R0;Xe.pointToLocalFrame(i,a,n,p);let v=Math.floor((p.x-m)/d)-1,x=Math.ceil((p.x+m)/d)+1,S=Math.floor((p.y-m)/d)-1,C=Math.ceil((p.y+m)/d)+1;if(x<0||C<0||v>c.length||S>c[0].length)return;v<0&&(v=0),x<0&&(x=0),S<0&&(S=0),C<0&&(C=0),v>=c.length&&(v=c.length-1),x>=c.length&&(x=c.length-1),C>=c[0].length&&(C=c[0].length-1),S>=c[0].length&&(S=c[0].length-1);const w=[];t.getRectMinMax(v,S,x,C,w);const A=w[0],O=w[1];if(!(p.z-m>O||p.z+m<A))for(let M=v;M<x;M++)for(let E=S;E<C;E++){let U=!1;if(t.getConvexTrianglePillar(M,E,!1),Xe.pointToWorldFrame(i,a,t.pillarOffset,g),n.distanceTo(g)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(U=this.convexConvex(e,t.pillarConvex,n,g,s,a,l,h,null,null,o,_,null)),o&&U||(t.getConvexTrianglePillar(M,E,!0),Xe.pointToWorldFrame(i,a,t.pillarOffset,g),n.distanceTo(g)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(U=this.convexConvex(e,t.pillarConvex,n,g,s,a,l,h,null,null,o,_,null)),o&&U))return!0}}sphereParticle(e,t,n,i,s,a,l,h,u,f,o){const c=E0;if(c.set(0,0,1),i.vsub(n,c),c.lengthSquared()<=e.radius*e.radius){if(o)return!0;const m=this.createContactEquation(h,l,t,e,u,f);c.normalize(),m.rj.copy(c),m.rj.scale(e.radius,m.rj),m.ni.copy(c),m.ni.negate(m.ni),m.ri.set(0,0,0),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}}planeParticle(e,t,n,i,s,a,l,h,u,f,o){const c=M0;c.set(0,0,1),l.quaternion.vmult(c,c);const d=S0;if(i.vsub(l.position,d),c.dot(d)<=0){if(o)return!0;const g=this.createContactEquation(h,l,t,e,u,f);g.ni.copy(c),g.ni.negate(g.ni),g.ri.set(0,0,0);const _=b0;c.scale(c.dot(i),_),i.vsub(_,_),g.rj.copy(_),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}boxParticle(e,t,n,i,s,a,l,h,u,f,o){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,n,i,s,a,l,h,e,t,o)}convexParticle(e,t,n,i,s,a,l,h,u,f,o){let c=-1;const d=T0,m=A0;let g=null;const _=w0;if(_.copy(i),_.vsub(n,_),s.conjugate(Il),Il.vmult(_,_),e.pointIsInside(_)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(n,s),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(s);for(let p=0,v=e.faces.length;p!==v;p++){const x=[e.worldVertices[e.faces[p][0]]],S=e.worldFaceNormals[p];i.vsub(x[0],Dl);const C=-S.dot(Dl);if(g===null||Math.abs(C)<Math.abs(g)){if(o)return!0;g=C,c=p,d.copy(S)}}if(c!==-1){const p=this.createContactEquation(h,l,t,e,u,f);d.scale(g,m),m.vadd(i,m),m.vsub(n,m),p.rj.copy(m),d.negate(p.ni),p.ri.set(0,0,0);const v=p.ri,x=p.rj;v.vadd(i,v),v.vsub(h.position,v),x.vadd(n,x),x.vsub(l.position,x),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(e,t,n,i,s,a,l,h,u,f,o){return this.convexHeightfield(t,e,i,n,a,s,h,l,u,f,o)}particleCylinder(e,t,n,i,s,a,l,h,u,f,o){return this.convexParticle(t,e,i,n,a,s,h,l,u,f,o)}sphereTrimesh(e,t,n,i,s,a,l,h,u,f,o){const c=Fg,d=Og,m=Bg,g=zg,_=Hg,p=Gg,v=Xg,x=Ng,S=Dg,C=qg;Xe.pointToLocalFrame(i,a,n,_);const w=e.radius;v.lowerBound.set(_.x-w,_.y-w,_.z-w),v.upperBound.set(_.x+w,_.y+w,_.z+w),t.getTrianglesInAABB(v,C);const A=Ug,O=e.radius*e.radius;for(let N=0;N<C.length;N++)for(let P=0;P<3;P++)if(t.getVertex(t.indices[C[N]*3+P],A),A.vsub(_,S),S.lengthSquared()<=O){if(x.copy(A),Xe.pointToWorldFrame(i,a,x,A),A.vsub(n,S),o)return!0;let L=this.createContactEquation(l,h,e,t,u,f);L.ni.copy(S),L.ni.normalize(),L.ri.copy(L.ni),L.ri.scale(e.radius,L.ri),L.ri.vadd(n,L.ri),L.ri.vsub(l.position,L.ri),L.rj.copy(A),L.rj.vsub(h.position,L.rj),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult)}for(let N=0;N<C.length;N++)for(let P=0;P<3;P++){t.getVertex(t.indices[C[N]*3+P],c),t.getVertex(t.indices[C[N]*3+(P+1)%3],d),d.vsub(c,m),_.vsub(d,p);const L=p.dot(m);_.vsub(c,p);let I=p.dot(m);if(I>0&&L<0&&(_.vsub(c,p),g.copy(m),g.normalize(),I=p.dot(g),g.scale(I,p),p.vadd(c,p),p.distanceTo(_)<e.radius)){if(o)return!0;const H=this.createContactEquation(l,h,e,t,u,f);p.vsub(_,H.ni),H.ni.normalize(),H.ni.scale(e.radius,H.ri),H.ri.vadd(n,H.ri),H.ri.vsub(l.position,H.ri),Xe.pointToWorldFrame(i,a,p,p),p.vsub(h.position,H.rj),Xe.vectorToWorldFrame(a,H.ni,H.ni),Xe.vectorToWorldFrame(a,H.ri,H.ri),this.result.push(H),this.createFrictionEquationsFromContact(H,this.frictionResult)}}const M=kg,E=Vg,U=Wg,z=Ig;for(let N=0,P=C.length;N!==P;N++){t.getTriangleVertices(C[N],M,E,U),t.getNormal(C[N],z),_.vsub(M,p);let L=p.dot(z);if(z.scale(L,p),_.vsub(p,p),L=p.distanceTo(_),ht.pointInTriangle(p,M,E,U)&&L<e.radius){if(o)return!0;let I=this.createContactEquation(l,h,e,t,u,f);p.vsub(_,I.ni),I.ni.normalize(),I.ni.scale(e.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(l.position,I.ri),Xe.pointToWorldFrame(i,a,p,p),p.vsub(h.position,I.rj),Xe.vectorToWorldFrame(a,I.ni,I.ni),Xe.vectorToWorldFrame(a,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}C.length=0}planeTrimesh(e,t,n,i,s,a,l,h,u,f,o){const c=new y,d=Cg;d.set(0,0,1),s.vmult(d,d);for(let m=0;m<t.vertices.length/3;m++){t.getVertex(m,c);const g=new y;g.copy(c),Xe.pointToWorldFrame(i,a,g,c);const _=Pg;if(c.vsub(n,_),d.dot(_)<=0){if(o)return!0;const v=this.createContactEquation(l,h,e,t,u,f);v.ni.copy(d);const x=Lg;d.scale(_.dot(d),x),c.vsub(x,x),v.ri.copy(x),v.ri.vsub(l.position,v.ri),v.rj.copy(c),v.rj.vsub(h.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}}const Xn=new y,Ti=new y,Ai=new y,wg=new y,Tg=new y,Ag=new lt,Rg=new lt,Cg=new y,Pg=new y,Lg=new y,Ig=new y,Dg=new y;new y;const Ug=new y,Ng=new y,Fg=new y,Og=new y,Bg=new y,zg=new y,Hg=new y,Gg=new y,kg=new y,Vg=new y,Wg=new y,Xg=new Gt,qg=[],$s=new y,Ll=new y,Yg=new y,jg=new y,$g=new y;function Zg(r,e,t){let n=null;const i=r.length;for(let s=0;s!==i;s++){const a=r[s],l=Yg;r[(s+1)%i].vsub(a,l);const h=jg;l.cross(e,h);const u=$g;t.vsub(a,u);const f=h.dot(u);if(n===null||f>0&&n===!0||f<=0&&n===!1){n===null&&(n=f>0);continue}else return!1}return!0}const Zs=new y,Kg=new y,Jg=new y,Qg=new y,e0=[new y,new y,new y,new y,new y,new y],t0=new y,n0=new y,i0=new y,s0=new y,r0=new y,o0=new y,a0=new y,l0=new y,c0=new y,h0=new y,u0=new y,d0=new y,f0=new y,p0=new y;new y;new y;const m0=new y,_0=new y,g0=new y,v0=new y,x0=new y,y0=new y,M0=new y,S0=new y,b0=new y,E0=new y,Il=new lt,w0=new y;new y;const T0=new y,Dl=new y,A0=new y,R0=new y,C0=new y,P0=[0],L0=new y,I0=new y;class Ul{constructor(){this.current=[],this.previous=[]}getKey(e,t){if(t<e){const n=t;t=e,e=n}return e<<16|t}set(e,t){const n=this.getKey(e,t),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let a=i.length-1;a>=s;a--)i[a+1]=i[a];i[s]=n}}tick(){const e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}getDiff(e,t){const n=this.current,i=this.previous,s=n.length,a=i.length;let l=0;for(let h=0;h<s;h++){let u=!1;const f=n[h];for(;f>i[l];)l++;u=f===i[l],u||Nl(e,f)}l=0;for(let h=0;h<a;h++){let u=!1;const f=i[h];for(;f>n[l];)l++;u=n[l]===f,u||Nl(t,f)}}}function Nl(r,e){r.push((e&4294901760)>>16,e&65535)}const ro=(r,e)=>r<e?`${r}-${e}`:`${e}-${r}`;class D0{constructor(){this.data={keys:[]}}get(e,t){const n=ro(e,t);return this.data[n]}set(e,t,n){const i=ro(e,t);this.get(e,t)||this.data.keys.push(i),this.data[i]=n}delete(e,t){const n=ro(e,t),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const e=this.data,t=e.keys;for(;t.length>0;){const n=t.pop();delete e[n]}}}class U0 extends bc{constructor(e){e===void 0&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=e.quatNormalizeSkip!==void 0?e.quatNormalizeSkip:0,this.quatNormalizeFast=e.quatNormalizeFast!==void 0?e.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new y,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new y,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=e.broadphase!==void 0?e.broadphase:new H_,this.bodies=[],this.hasActiveBodies=!1,this.solver=e.solver!==void 0?e.solver:new vg,this.constraints=[],this.narrowphase=new Eg(this),this.collisionMatrix=new yl,this.collisionMatrixPrevious=new yl,this.bodyOverlapKeeper=new Ul,this.shapeOverlapKeeper=new Ul,this.contactmaterials=[],this.contactMaterialTable=new D0,this.defaultMaterial=new Dn("default"),this.defaultContactMaterial=new ni(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}collisionMatrixTick(){const e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(e){this.constraints.push(e)}removeConstraint(e){const t=this.constraints.indexOf(e);t!==-1&&this.constraints.splice(t,1)}rayTest(e,t,n){n instanceof lr?this.raycastClosest(e,t,{skipBackfaces:!0},n):this.raycastAll(e,t,{skipBackfaces:!0},n)}raycastAll(e,t,n,i){return n===void 0&&(n={}),n.mode=ht.ALL,n.from=e,n.to=t,n.callback=i,oo.intersectWorld(this,n)}raycastAny(e,t,n,i){return n===void 0&&(n={}),n.mode=ht.ANY,n.from=e,n.to=t,n.result=i,oo.intersectWorld(this,n)}raycastClosest(e,t,n,i){return n===void 0&&(n={}),n.mode=ht.CLOSEST,n.from=e,n.to=t,n.result=i,oo.intersectWorld(this,n)}addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof ce&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}removeBody(e){e.world=null;const t=this.bodies.length-1,n=this.bodies,i=n.indexOf(e);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}getShapeById(e){const t=this.bodies;for(let n=0;n<t.length;n++){const i=t[n].shapes;for(let s=0;s<i.length;s++){const a=i[s];if(a.id===e)return a}}return null}addContactMaterial(e){this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}removeContactMaterial(e){const t=this.contactmaterials.indexOf(e);t!==-1&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}fixedStep(e,t){e===void 0&&(e=1/60),t===void 0&&(t=10);const n=ut.now()/1e3;if(!this.lastCallTime)this.step(e,void 0,t);else{const i=n-this.lastCallTime;this.step(e,i,t)}this.lastCallTime=n}step(e,t,n){if(n===void 0&&(n=10),t===void 0)this.internalStep(e),this.time+=e;else{this.accumulator+=t;const i=ut.now();let s=0;for(;this.accumulator>=e&&s<n&&(this.internalStep(e),this.accumulator-=e,s++,!(ut.now()-i>e*1e3)););this.accumulator=this.accumulator%e;const a=this.accumulator/e;for(let l=0;l!==this.bodies.length;l++){const h=this.bodies[l];h.previousPosition.lerp(h.position,a,h.interpolatedPosition),h.previousQuaternion.slerp(h.quaternion,a,h.interpolatedQuaternion),h.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;const t=this.contacts,n=z0,i=H0,s=this.bodies.length,a=this.bodies,l=this.solver,h=this.gravity,u=this.doProfiling,f=this.profile,o=ce.DYNAMIC;let c=-1/0;const d=this.constraints,m=B0;h.length();const g=h.x,_=h.y,p=h.z;let v=0;for(u&&(c=ut.now()),v=0;v!==s;v++){const N=a[v];if(N.type===o){const P=N.force,L=N.mass;P.x+=L*g,P.y+=L*_,P.z+=L*p}}for(let N=0,P=this.subsystems.length;N!==P;N++)this.subsystems[N].update();u&&(c=ut.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),u&&(f.broadphase=ut.now()-c);let x=d.length;for(v=0;v!==x;v++){const N=d[v];if(!N.collideConnected)for(let P=n.length-1;P>=0;P-=1)(N.bodyA===n[P]&&N.bodyB===i[P]||N.bodyB===n[P]&&N.bodyA===i[P])&&(n.splice(P,1),i.splice(P,1))}this.collisionMatrixTick(),u&&(c=ut.now());const S=O0,C=t.length;for(v=0;v!==C;v++)S.push(t[v]);t.length=0;const w=this.frictionEquations.length;for(v=0;v!==w;v++)m.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,t,S,this.frictionEquations,m),u&&(f.narrowphase=ut.now()-c),u&&(c=ut.now()),v=0;v<this.frictionEquations.length;v++)l.addEquation(this.frictionEquations[v]);const A=t.length;for(let N=0;N!==A;N++){const P=t[N],L=P.bi,I=P.bj,j=P.si,H=P.sj;let G;if(L.material&&I.material?G=this.getContactMaterial(L.material,I.material)||this.defaultContactMaterial:G=this.defaultContactMaterial,G.friction,L.material&&I.material&&(L.material.friction>=0&&I.material.friction>=0&&L.material.friction*I.material.friction,L.material.restitution>=0&&I.material.restitution>=0&&(P.restitution=L.material.restitution*I.material.restitution)),l.addEquation(P),L.allowSleep&&L.type===ce.DYNAMIC&&L.sleepState===ce.SLEEPING&&I.sleepState===ce.AWAKE&&I.type!==ce.STATIC){const K=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),Z=I.sleepSpeedLimit**2;K>=Z*2&&(L.wakeUpAfterNarrowphase=!0)}if(I.allowSleep&&I.type===ce.DYNAMIC&&I.sleepState===ce.SLEEPING&&L.sleepState===ce.AWAKE&&L.type!==ce.STATIC){const K=L.velocity.lengthSquared()+L.angularVelocity.lengthSquared(),Z=L.sleepSpeedLimit**2;K>=Z*2&&(I.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(L,I,!0),this.collisionMatrixPrevious.get(L,I)||(es.body=I,es.contact=P,L.dispatchEvent(es),es.body=L,I.dispatchEvent(es)),this.bodyOverlapKeeper.set(L.id,I.id),this.shapeOverlapKeeper.set(j.id,H.id)}for(this.emitContactEvents(),u&&(f.makeContactConstraints=ut.now()-c,c=ut.now()),v=0;v!==s;v++){const N=a[v];N.wakeUpAfterNarrowphase&&(N.wakeUp(),N.wakeUpAfterNarrowphase=!1)}for(x=d.length,v=0;v!==x;v++){const N=d[v];N.update();for(let P=0,L=N.equations.length;P!==L;P++){const I=N.equations[P];l.addEquation(I)}}l.solve(e,this),u&&(f.solve=ut.now()-c),l.removeAllEquations();const O=Math.pow;for(v=0;v!==s;v++){const N=a[v];if(N.type&o){const P=O(1-N.linearDamping,e),L=N.velocity;L.scale(P,L);const I=N.angularVelocity;if(I){const j=O(1-N.angularDamping,e);I.scale(j,I)}}}this.dispatchEvent(F0),u&&(c=ut.now());const E=this.stepnumber%(this.quatNormalizeSkip+1)===0,U=this.quatNormalizeFast;for(v=0;v!==s;v++)a[v].integrate(e,E,U);this.clearForces(),this.broadphase.dirty=!0,u&&(f.integrate=ut.now()-c),this.stepnumber+=1,this.dispatchEvent(N0);let z=!0;if(this.allowSleep)for(z=!1,v=0;v!==s;v++){const N=a[v];N.sleepTick(this.time),N.sleepState!==ce.SLEEPING&&(z=!0)}this.hasActiveBodies=z}emitContactEvents(){const e=this.hasAnyEventListener("beginContact"),t=this.hasAnyEventListener("endContact");if((e||t)&&this.bodyOverlapKeeper.getDiff(pn,mn),e){for(let s=0,a=pn.length;s<a;s+=2)ts.bodyA=this.getBodyById(pn[s]),ts.bodyB=this.getBodyById(pn[s+1]),this.dispatchEvent(ts);ts.bodyA=ts.bodyB=null}if(t){for(let s=0,a=mn.length;s<a;s+=2)ns.bodyA=this.getBodyById(mn[s]),ns.bodyB=this.getBodyById(mn[s+1]),this.dispatchEvent(ns);ns.bodyA=ns.bodyB=null}pn.length=mn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(pn,mn),n){for(let s=0,a=pn.length;s<a;s+=2){const l=this.getShapeById(pn[s]),h=this.getShapeById(pn[s+1]);_n.shapeA=l,_n.shapeB=h,l&&(_n.bodyA=l.body),h&&(_n.bodyB=h.body),this.dispatchEvent(_n)}_n.bodyA=_n.bodyB=_n.shapeA=_n.shapeB=null}if(i){for(let s=0,a=mn.length;s<a;s+=2){const l=this.getShapeById(mn[s]),h=this.getShapeById(mn[s+1]);gn.shapeA=l,gn.shapeB=h,l&&(gn.bodyA=l.body),h&&(gn.bodyB=h.body),this.dispatchEvent(gn)}gn.bodyA=gn.bodyB=gn.shapeA=gn.shapeB=null}}clearForces(){const e=this.bodies,t=e.length;for(let n=0;n!==t;n++){const i=e[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Gt;const oo=new ht,ut=globalThis.performance||{};if(!ut.now){let r=Date.now();ut.timing&&ut.timing.navigationStart&&(r=ut.timing.navigationStart),ut.now=()=>Date.now()-r}new y;const N0={type:"postStep"},F0={type:"preStep"},es={type:ce.COLLIDE_EVENT_NAME,body:null,contact:null},O0=[],B0=[],z0=[],H0=[],pn=[],mn=[],ts={type:"beginContact",bodyA:null,bodyB:null},ns={type:"endContact",bodyA:null,bodyB:null},_n={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},gn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class G0{constructor(){this._world=new U0({gravity:new y(0,-35,0)}),this._world.broadphase=new Ii(this._world),this._world.allowSleep=!1,this._world.solver.iterations=20,this.ballMaterial=new Dn("ball"),this.softSlabMaterial=new Dn("softSlab"),this.hardSlabMaterial=new Dn("hardSlab"),this.poleMaterial=new Dn("pole"),this._world.poleMaterial=this.poleMaterial;const e=new ni(this.ballMaterial,this.softSlabMaterial,{friction:0,restitution:0});this._world.addContactMaterial(e);const t=new ni(this.ballMaterial,this.hardSlabMaterial,{friction:0,restitution:0});this._world.addContactMaterial(t),this._world.addContactMaterial(new ni(this.ballMaterial,this.poleMaterial,{friction:0,restitution:0}))}step(e){this._world.step(1/120,e,8)}createBallBody(e,t){const n=new ce({mass:1,shape:new so(e),material:this.ballMaterial});return n.position.set(t.x,t.y,t.z),n.linearDamping=0,n.angularDamping=1,n.allowSleep=!1,this._world.addBody(n),n}createSlabBody(e,t,n,i,s){const a=new ce({mass:0,shape:new ms(new y(e,t,n))});return a.position.set(i.x,i.y,i.z),s&&a.quaternion.set(s.x,s.y,s.z,s.w),this._world.addBody(a),a}createPoleBody(e,t){const n=t*.5,i=new ce({mass:0,material:this.poleMaterial}),s=new _g(e,e,t,16),a=new lt;return a.setFromEuler(0,0,Math.PI/2),i.addShape(s,new y(0,0,0),a),i.addShape(new so(e),new y(0,n,0)),i.addShape(new so(e),new y(0,-n,0)),this._world.addBody(i),i}removeBody(e){e&&this._world.removeBody(e)}get world(){return this._world}}class k0{constructor(e){this.canvas=e,this.isPointerDown=!1,this.isDragging=!1,this.activePointerId=null,this.lastX=0,this._deltaX=0,this.sensitivity=.005,this.inertia=0,this.inertiaDamping=.88,this._indicatorHideTimer=null,this.rotationIndicator=document.createElement("div"),this.rotationIndicator.style.cssText=`
			position:fixed;
			left:50%;
			top:58%;
			transform:translate(-50%,-50%) scale(0.9);
			width:70px;
			height:70px;
			border:3px solid rgba(244,67,54,0.9);
			border-radius:50%;
			display:flex;
			align-items:center;
			justify-content:center;
			color:rgba(244,67,54,0.95);
			font-size:30px;
			font-weight:900;
			opacity:0;
			pointer-events:none;
			z-index:40;
			transition:opacity 0.15s ease, transform 0.15s ease;
		`,this.rotationIndicator.textContent="↻",document.body.appendChild(this.rotationIndicator),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerCancel=this._onPointerCancel.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onWindowBlur=this._onWindowBlur.bind(this),window.addEventListener("pointerdown",this._onPointerDown,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove,{passive:!1}),window.addEventListener("pointerup",this._onPointerUp),window.addEventListener("pointercancel",this._onPointerCancel),window.addEventListener("keydown",this._onKeyDown),window.addEventListener("blur",this._onWindowBlur)}_onPointerDown(e){e.pointerType==="mouse"&&e.button!==0||this._isFromCanvasEvent(e)&&(this.activePointerId=e.pointerId??null,this.isPointerDown=!0,this.isDragging=!0,this.lastX=e.clientX,this.inertia=0)}_onPointerMove(e){if(this.activePointerId!==null&&e.pointerId!==this.activePointerId)return;if(e.pointerType==="mouse"&&this.isDragging&&!(e.buttons&1)){this._clearPointerState();return}if(!this.isDragging)return;const t=(e.clientX-this.lastX)*this.sensitivity;this._deltaX=t,this.inertia=t,this.lastX=e.clientX,Math.abs(t)>1e-4&&this._showRotationIndicator(t>0?1:-1)}_onPointerUp(e){e.pointerType==="mouse"&&e.button!==0||this.activePointerId!==null&&e.pointerId!==this.activePointerId||this._clearPointerState()}_onPointerCancel(){this._clearPointerState()}_onKeyDown(e){e.key==="ArrowLeft"&&(this.inertia=-.05,this._showRotationIndicator(-1)),e.key==="ArrowRight"&&(this.inertia=.05,this._showRotationIndicator(1))}_onWindowBlur(){this._clearPointerState()}_isFromCanvasEvent(e){if(!this.canvas||!e)return!0;const t=typeof e.clientX=="number"?e.clientX:null,n=typeof e.clientY=="number"?e.clientY:null;if(typeof t=="number"&&typeof n=="number"){const i=this.canvas.getBoundingClientRect();return t>=i.left&&t<=i.right&&n>=i.top&&n<=i.bottom}return!0}_clearPointerState(){this.isPointerDown=!1,this.isDragging=!1,this.activePointerId=null,this._deltaX=0}cancelPress(){this._clearPointerState()}_showRotationIndicator(e){this.rotationIndicator&&(this.rotationIndicator.textContent=e>0?"↻":"↺",this.rotationIndicator.style.opacity="1",this.rotationIndicator.style.transform="translate(-50%,-50%) scale(1)",this._indicatorHideTimer&&clearTimeout(this._indicatorHideTimer),this._indicatorHideTimer=setTimeout(()=>{this.rotationIndicator.style.opacity="0",this.rotationIndicator.style.transform="translate(-50%,-50%) scale(0.9)"},180))}update(){this.isDragging||(this.inertia*=this.inertiaDamping),Math.abs(this.inertia)<1e-4&&(this.inertia=0),this._deltaX=this.isDragging?this._deltaX:this.inertia}get rotation(){return this._deltaX}get isPressing(){return this.isPointerDown}}const V0="modulepreload",W0=function(r,e){return new URL(r,e).href},Fl={},Ks=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),h=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=Promise.allSettled(t.map(u=>{if(u=W0(u,n),u in Fl)return;Fl[u]=!0;const f=u.endsWith(".css"),o=f?'[rel="stylesheet"]':"";if(!!n)for(let m=a.length-1;m>=0;m--){const g=a[m];if(g.href===u&&(!f||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${o}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":V0,f||(d.as="script"),d.crossOrigin="",d.href=u,h&&d.setAttribute("nonce",h),document.head.appendChild(d),f)return new Promise((m,g)=>{d.addEventListener("load",m),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return i.then(a=>{for(const l of a||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})},Ri=.5,vn=.72,X0=4.05,q0=1.35,Y0=3.45,j0=8.9,$0=16.6;class Z0{constructor(e,t,n=1){this.scene=e,this._scene=e,this.physics=t,this._visualZOffset=.36,this._baseScale=Ri*2;const i=this._createBallSpriteTexture(),s=new Io({map:i,transparent:!0,depthTest:!1,depthWrite:!1});this.mesh=new yc(s),this.mesh.castShadow=!1,this.mesh.renderOrder=999,this.mesh.position.set(0,vn,this._visualZOffset),this.mesh.scale.set(this._baseScale,this._baseScale,1),this._visualY=vn,this._smoothedVelY=0,this._baseSpriteColor=new Le(16777215),this._landingTintColor=this._baseSpriteColor.clone(),this._landingTintTimer=0,e.add(this.mesh);const a=new _r(Ri*.72,18),l=new ds({color:0,transparent:!0,opacity:.22,depthTest:!0,depthWrite:!1});this._shadow=new xt(a,l),this._shadow.rotation.x=-Math.PI/2,this._shadow.renderOrder=998,e.add(this._shadow),this.body=this.physics.createBallBody(Ri,{x:0,y:vn,z:0}),this.isAlive=!0,this._dieAnimId=null,this._lastVelY=0,this._lastContactY=vn,this._fallHeight=0,this._state="idle",this._stateTimer=0,this._squashTimer=0,this._fallSpeed=0,this._BALL_RADIUS=Ri,this._lastTrail=0,this._hardContactLockUntil=0,this._lastBounceAt=0,this._lastLandingType="",this._lastLandingHintAt=0,this._lastContactResolveAt=0,this._idlePhase=Math.random()*Math.PI*2,this._isBreakInputActive=()=>!1,this._onCollide=h=>{const u=Date.now(),f=h.body,o=f.userData;if(!(!o||!o.type)&&!(o.type!=="soft_slab"&&o.type!=="hard_slab")&&(this._emitLandingHint(o.type==="soft_slab"?"soft":"hard"),!this._recentHits.has(f.id)))if(this._lastContactY=this.body.position.y,this._fallHeight=0,o.type==="soft_slab"){const c=this.body.velocity.y<=1,d=this._canBreakSoftSlab();c&&d?(this._markRecentHit(f.id,140),this._pendingBounce=!1,this._pendingBounceSpeed=0,this._squashTimer=.08,Ks(()=>Promise.resolve().then(()=>Js),void 0,import.meta.url).then(g=>{var _;(_=g.GameManager.instance)==null||_.onSoftHit(o)})):(this._markRecentHit(f.id,120),this._queueBounce(this._computeLimitedBounceSpeed(this.body.position.y)),this._squashTimer=.18)}else o.type==="hard_slab"&&(this._markRecentHit(f.id,160),this._hardContactLockUntil=u+170,this._queueBounce(this._computeLimitedBounceSpeed(this.body.position.y)),this._squashTimer=.25,Ks(()=>Promise.resolve().then(()=>Js),void 0,import.meta.url).then(c=>{var d;(d=c.GameManager.instance)==null||d.onHardHit(o)}))},this.body.addEventListener("collide",this._onCollide),this._recentHits=new Set,this._pendingBounce=!1,this._pendingBounceSpeed=0,this._postStepHandler&&this.physics.world.removeEventListener("postStep",this._postStepHandler),this._postStepHandler=()=>{this.body.position.x=0,this.body.position.z=0,this.body.velocity.x=0,this.body.velocity.z=0,this.body.angularVelocity.set(0,0,0),this._pendingBounce&&(this.body.velocity.y=Math.max(this._pendingBounceSpeed,this.body.velocity.y),this.body.position.y+=.03,this._pendingBounce=!1),this.body.position.y>4&&(this.body.position.y=4,this.body.velocity.y>0&&(this.body.velocity.y=0))},this.physics.world.addEventListener("postStep",this._postStepHandler)}_createBallSpriteTexture(){const t=document.createElement("canvas");t.width=256,t.height=256;const n=t.getContext("2d"),i=256*.5,s=256*.5,a=256*.45;n.clearRect(0,0,256,256);const l=n.createRadialGradient(i-a*.28,s-a*.25,a*.12,i,s,a);l.addColorStop(0,"#5AAAF3"),l.addColorStop(.65,"#1E88E5"),l.addColorStop(1,"#0D47A1"),n.fillStyle=l,n.beginPath(),n.arc(i,s,a,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.55)",n.beginPath(),n.ellipse(i-a*.28,s-a*.22,a*.2,a*.17,-.35,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.90)",n.beginPath(),n.ellipse(i-a*.03,s-a*.35,a*.17,a*.12,0,0,Math.PI*2),n.fill(),n.strokeStyle="rgba(255,255,255,0.18)",n.lineWidth=a*.09,n.beginPath(),n.arc(i,s,a*.9,Math.PI*.15,Math.PI*.95),n.stroke();const h=new xo(t);return h.needsUpdate=!0,h.minFilter=It,h.magFilter=It,h}_applyScale(e,t){this.mesh.scale.set(this._baseScale*e,this._baseScale*t,1)}_emitLandingHint(e){const t=Date.now();e===this._lastLandingType&&t-this._lastLandingHintAt<120||(this._lastLandingType=e,this._lastLandingHintAt=t,Ks(()=>Promise.resolve().then(()=>Js),void 0,import.meta.url).then(n=>{var i,s;(s=(i=n.GameManager.instance)==null?void 0:i.notifyLandingType)==null||s.call(i,e)}),this._landingTintColor.setHex(e==="soft"?9437144:16765594),this._landingTintTimer=.22)}_computeLimitedBounceSpeed(e){var a,l,h;const t=Math.abs(((h=(l=(a=this.physics)==null?void 0:a.world)==null?void 0:l.gravity)==null?void 0:h.y)??35),n=Math.max(.8,3.8-e),i=yn.clamp(Math.min(X0,n),q0,Y0),s=Math.sqrt(2*t*i);return yn.clamp(s,j0,$0)}_queueBounce(e){const t=Date.now();if(t-this._lastBounceAt<90){this._pendingBounce=!0,this._pendingBounceSpeed=Math.max(this._pendingBounceSpeed*.92,e*.9);return}this._pendingBounce=!0,this._pendingBounceSpeed=e,this._lastBounceAt=t}_markRecentHit(e,t=120){this._recentHits.add(e),setTimeout(()=>this._recentHits.delete(e),t)}_isTouchingHardSlab(){return this._getActiveSlabContacts().hasHard}_getActiveSlabContacts(){var n,i,s,a,l;const e=(s=(i=(n=this.physics)==null?void 0:n.world)==null?void 0:i.narrowphase)==null?void 0:s.contactEquations,t={hasSoft:!1,hasHard:!1,softUserData:null,hardUserData:null};if(!e||e.length===0)return t;for(const h of e){const u=h.bi,f=h.bj;if(u!==this.body&&f!==this.body)continue;const o=u===this.body?f:u;((a=o==null?void 0:o.userData)==null?void 0:a.type)==="soft_slab"&&(t.hasSoft=!0,t.softUserData||(t.softUserData=o.userData)),((l=o==null?void 0:o.userData)==null?void 0:l.type)==="hard_slab"&&(t.hasHard=!0,t.hardUserData||(t.hardUserData=o.userData))}return t}setBreakInputSource(e){this._isBreakInputActive=typeof e=="function"?e:()=>!1}_canBreakSoftSlab(){var e;try{return(e=this._isBreakInputActive)!=null&&e.call(this)?!0:(Date.now()<this._hardContactLockUntil,!1)}catch{return!1}}_resolveStuckContact(){const e=Date.now();if(e-this._lastContactResolveAt<110)return;const t=this._getActiveSlabContacts();if(!t.hasSoft&&!t.hasHard||!(Math.abs(this.body.velocity.y)<.16))return;if(t.hasHard&&(this._hardContactLockUntil=Math.max(this._hardContactLockUntil,e+130)),t.hasSoft&&this._canBreakSoftSlab()){this._pendingBounce=!1,this._pendingBounceSpeed=0,this._squashTimer=.08,this._lastContactResolveAt=e,Ks(()=>Promise.resolve().then(()=>Js),void 0,import.meta.url).then(s=>{var a;(a=s.GameManager.instance)==null||a.onSoftHit(t.softUserData)});return}this._queueBounce(this._computeLimitedBounceSpeed(this.body.position.y)),this._squashTimer=Math.max(this._squashTimer,.18),this._lastContactResolveAt=e}update(e){this.body.position.x=0,this.body.position.z=0,this.body.velocity.x=0,this.body.velocity.z=0,this.body.angularVelocity.set(0,0,0),this.mesh.position.x=0,this.mesh.position.z=this._visualZOffset,this.body.position.y>4&&(this.body.position.y=4,this.body.velocity.y>0&&(this.body.velocity.y=0)),Math.abs(this.body.velocity.y)<.5&&this.body.position.y>.8&&(this.body.velocity.y-=2.8*e),this._resolveStuckContact();const t=yn.clamp(e*14,0,1);this._visualY=yn.lerp(this._visualY,this.body.position.y,t),this.mesh.position.y=this._visualY,this._fallHeight=Math.max(0,this._lastContactY-this.body.position.y),this._shadow.position.set(this.body.position.x,this.body.position.y-Ri-.05,this.body.position.z);const n=Math.max(0,Math.min(1,1-(this._fallHeight||0)*.05));if(this._shadow.scale.setScalar(n),this._updateAnimation(e),this._landingTintTimer>0){this._landingTintTimer-=e;const i=Math.max(0,this._landingTintTimer/.22);this.mesh.material.color.copy(this._baseSpriteColor).lerp(this._landingTintColor,i*.9)}else this.mesh.material.color.copy(this._baseSpriteColor);this._lastVelY=this.body.velocity.y,this._smoothedVelY=yn.lerp(this._smoothedVelY,this.body.velocity.y,.22)}_updateAnimation(e){const t=this._smoothedVelY;if(this._fallSpeed=t,this._stateTimer+=e,this._idlePhase+=e*(2.1+Math.min(6,Math.abs(t))*.12),this.mesh.material.rotation+=e*(.95+Math.min(8,Math.abs(t))*.08),this.mesh.material.rotation>Math.PI*2&&(this.mesh.material.rotation-=Math.PI*2),this._squashTimer>0){this._squashTimer-=e;const i=1-this._squashTimer/.25,s=Math.sin(i*Math.PI),a=1+.55*s,l=1-.45*s;this._applyScale(a,l),this.mesh.position.y=this._visualY,this._state="squash";return}if(t<-9){const i=Math.min((-t-9)/12,1),s=1-i*.22,a=1+i*.4;this._applyScale(s,a),this.mesh.position.y=this._visualY,this._state="falling",this._spawnTrailParticle();return}if(t>4){const i=Math.min((t-4)/10,1),s=1-i*.1,a=1+i*.2;this._applyScale(s,a),this.mesh.position.y=this._visualY+Math.sin(this._idlePhase*.8)*.01,this._state="bounce";return}const n=1+Math.sin(Date.now()*.003)*.025;this._applyScale(n,n),this.mesh.position.y=this._visualY+Math.sin(this._idlePhase)*.018,this._state="idle"}_spawnTrailParticle(){const e=Date.now();if(e-(this._lastTrail||0)<30)return;this._lastTrail=e;const t=.06+Math.random()*.08,n=new Do(t,6,6),i=[16777215,11789820,5227511,8508666],s=i[Math.floor(Math.random()*i.length)],a=new ds({color:s,transparent:!0,opacity:.75}),l=new xt(n,a),h=this._BALL_RADIUS+.1+Math.random()*.3;l.position.set(this.mesh.position.x+(Math.random()-.5)*.15,this.mesh.position.y+h,this.mesh.position.z+(Math.random()-.5)*.15),this._scene.add(l);const u=e,f=140+Math.random()*80,o=l.position.y,c=()=>{const d=Date.now()-u;if(d>=f){this._scene.remove(l),n.dispose(),a.dispose();return}const m=d/f;l.position.y=o+m*.4,l.material.opacity=.75*(1-m),l.scale.setScalar(1-m*.5),requestAnimationFrame(c)};requestAnimationFrame(c)}die(){if(!this.isAlive)return;this.isAlive=!1,this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.type=ce.STATIC,this.body.updateMassProperties();const e=250,t=performance.now();this._dieAnimId&&cancelAnimationFrame(this._dieAnimId);const n=i=>{const s=Math.min(1,(i-t)/e),a=Math.max(0,1-s);this._applyScale(a,a),s<1?this._dieAnimId=requestAnimationFrame(n):this._dieAnimId=null};this._dieAnimId=requestAnimationFrame(n)}reset(e){this.body.position.set(0,vn,0),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.type=ce.DYNAMIC,this.body.updateMassProperties(),this.body.wakeUp(),this._dieAnimId&&(cancelAnimationFrame(this._dieAnimId),this._dieAnimId=null),this.mesh.position.set(0,vn,this._visualZOffset),this._applyScale(1,1),this._shadow.position.set(0,vn-Ri-.05,0),this._shadow.scale.setScalar(1),this.isAlive=!0,this._state="idle",this._stateTimer=0,this._squashTimer=0,this._fallSpeed=0,this._fallHeight=0,this._lastContactY=vn,this._visualY=vn,this._smoothedVelY=0,this._lastVelY=0,this._pendingBounce=!1,this._pendingBounceSpeed=0,this._hardContactLockUntil=0,this._lastBounceAt=0,this._lastLandingType="",this._lastLandingHintAt=0,this._lastContactResolveAt=0,this._idlePhase=Math.random()*Math.PI*2,this._landingTintTimer=0,this.mesh.material.color.copy(this._baseSpriteColor),this.mesh.material.rotation=0}dispose(e,t){var n;this._dieAnimId&&(cancelAnimationFrame(this._dieAnimId),this._dieAnimId=null),this.body.removeEventListener("collide",this._onCollide),e.remove(this.mesh),e.remove(this._shadow),t&&this.body&&t.removeBody(this.body),this._postStepHandler&&((n=t==null?void 0:t.removeEventListener)==null||n.call(t,"postStep",this._postStepHandler)),this.mesh.material.map&&this.mesh.material.map.dispose(),this.mesh.material.dispose(),this._shadow.geometry.dispose(),this._shadow.material.dispose()}}const Ol=[16757690,16768954,16777146,12255177,12247551,15186687,16759539,16762070],Ic=2960698,as=5,yo=.28,K0=2.8;function Bl(r,e){const t=[];for(let n=0;n<as;n++){const i=e+n/as*Math.PI*2-Math.PI/2;t.push(new Ae(Math.cos(i)*r,Math.sin(i)*r))}return t}function qn(r,e,t){return new Ae(yn.lerp(r.x,e.x,t),yn.lerp(r.y,e.y,t))}function J0(r,e,t,n,i){const s=yo*.5,a=[[r.x,s,r.y],[e.x,s,e.y],[t.x,s,t.y],[n.x,s,n.y],[r.x,-s,r.y],[e.x,-s,e.y],[t.x,-s,t.y],[n.x,-s,n.y]],l=[];for(const d of a)l.push(d[0],d[1],d[2]);const h=[0,1,2,0,2,3,4,6,5,4,7,6,0,4,5,0,5,1,1,5,6,1,6,2,2,6,7,2,7,3,3,7,4,3,4,0],u=new Nt;u.setAttribute("position",new yt(l,3)),u.setIndex(h),u.computeVertexNormals();const f=i===Ic,o=new Le(i),c=new a_({color:i,roughness:f?.9:.24,metalness:f?.02:.05,emissive:f?395277:o.clone().multiplyScalar(.34),emissiveIntensity:f?.02:.34,flatShading:!0});return new xt(u,c)}function Q0(r,e,t,n){const i=new Array(r).fill(!1),s=Math.max(1,Math.min(e,r));for(let a=0;a<s;a++){const l=Math.floor(Math.random()*r),h=Math.max(t,Math.min(n,Math.floor(t+Math.random()*(n-t+1))));for(let u=0;u<h;u++)i[(l+u)%r]=!0}if(!i.some(Boolean)){const a=Math.min(3,r);for(let l=0;l<a;l++)i[l]=!0}return i}class ev{constructor(e,t,n,i,s,a,l){this.scene=e,this.world=t,this.physics=n,this.yPosition=i,this.towerGroup=l,this.isBroken=!1,this.debris=[],this.pieces=[],this.softColor=Ol[s%Ol.length];const h=Math.max(3,(a==null?void 0:a.spotsPerSide)??4),u=Math.max(.05,(a==null?void 0:a.poleRadius)??.22),f=Math.max(.08,(a==null?void 0:a.poleGap)??.34),o=Math.max(.66,u+f),c=as*h,d=Math.max(1,(a==null?void 0:a.softRunCount)??2),m=Math.max(1,(a==null?void 0:a.softRunMin)??2),g=Math.max(m,(a==null?void 0:a.softRunMax)??4),_=Q0(c,d,m,g),p=Math.random()*Math.PI*2,v=Bl(K0,p),x=Bl(o,p);let S=0;for(let C=0;C<as;C++){const w=(C+1)%as,A=v[C],O=v[w],M=x[C],E=x[w];for(let U=0;U<h;U++){const z=U/h,N=(U+1)/h,P=qn(A,O,z),L=qn(A,O,N),I=qn(M,E,z),j=qn(M,E,N),H=_[S],G=H?this.softColor:Ic,K=H?this.physics.softSlabMaterial:this.physics.hardSlabMaterial,Z=J0(P,L,j,I,G);Z.castShadow=!0,Z.receiveShadow=!0,Z.position.y=i,this.towerGroup.add(Z);const $=this._buildSpotBody(P,L,I,j,K);$.userData={type:H?"soft_slab":"hard_slab",slab:this,yPosition:i,spotIndex:S},this.world.addBody($),this.pieces.push({mesh:Z,body:$,color:G}),S++}}}_buildSpotBody(e,t,n,i,s){const a=qn(e,t,.5),l=qn(n,i,.5),h=qn(a,l,.5),u=t.clone().sub(e),f=u.length();u.normalize();const o=a.distanceTo(l),c=new ce({mass:0,material:s}),d=Math.max(.05,f*.43),m=yo*.5,g=Math.max(.05,o*.44),_=new ms(new y(d,m,g));c.addShape(_),c.position.set(h.x,this.yPosition,h.y);const p=Math.atan2(u.y,u.x);return c.quaternion.setFromAxisAngle(new y(0,1,0),p),c}syncBodiesToTower(){if(!this.isBroken)for(const e of this.pieces)!e.body||!e.mesh||this._syncBody(e.body,e.mesh)}_syncBody(e,t){const n=new F,i=new ki;t.getWorldPosition(n),t.getWorldQuaternion(i),e.position.set(n.x,n.y,n.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.wakeUp()}breakWholeSlab(e){if(!this.isBroken){this.isBroken=!0;for(const t of this.pieces)t.body&&(this.world.removeBody(t.body),t.body=null);for(const t of this.pieces){if(!t.mesh)continue;const n=new F;if(t.mesh.getWorldPosition(n),Math.random()<.9){const i=new ri(.36+Math.random()*.24,yo,.22+Math.random()*.18),s=new Li({color:t.color,flatShading:!0}),a=new xt(i,s);a.position.copy(n),a.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),this.scene.add(a);const l=Math.atan2(n.z,n.x)+(Math.random()-.5)*.4,h=4+Math.random()*4;this.debris.push({mesh:a,vx:Math.cos(l)*h,vy:1.6+Math.random()*2.8,vz:Math.sin(l)*h,rotX:(Math.random()-.5)*10,rotZ:(Math.random()-.5)*10,life:.8+Math.random()*.5})}this.towerGroup.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),t.mesh=null}if(e){const t=new F(0,this.yPosition,0);e.burst(t,new Le(this.softColor),25)}}}animateDebris(e){for(let t=this.debris.length-1;t>=0;t--){const n=this.debris[t];n.mesh.position.x+=n.vx*e,n.mesh.position.y+=n.vy*e,n.mesh.position.z+=n.vz*e,n.vy-=20*e,n.mesh.rotation.x+=n.rotX*e,n.mesh.rotation.z+=n.rotZ*e,n.life-=e,n.life<.3&&(n.mesh.material.opacity=n.life/.3,n.mesh.material.transparent=!0),n.life<=0&&(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.debris.splice(t,1))}}dispose(){for(const e of this.pieces)e.body&&this.world.removeBody(e.body),e.mesh&&(this.towerGroup.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose());this.pieces=[];for(const e of this.debris)this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();this.debris=[]}}const tv=.62;function nv(r){const e=Math.max(1,Math.min(r,10)),t=e<=5?2:1,n=e<=3?4:3;return{slabCount:12+e*2,rotationSpeed:.5+e*.06,spotsPerSide:4,softRunCount:t,softRunMin:2,softRunMax:n,poleRadius:.22,poleGap:.44}}class iv{constructor(e,t,n){this.scene=e,this.world=t,this.physics=n,this.towerGroup=new Jn,e.add(this.towerGroup),this.slabs=[],this.slabsBroken=0,this.totalSlabs=0,this.autoRotationSpeed=0,this.particleSystem=null}buildLevel(e){for(const t of this.slabs)t.dispose();this.slabs=[],this.slabsBroken=0,this.totalSlabs=e.slabCount,this.autoRotationSpeed=(Math.random()>.5?1:-1)*(e.rotationSpeed??.5)*.2;for(let t=0;t<e.slabCount;t++){const n=-(t*tv),i=new ev(this.scene,this.world,this.physics,n,t,e,this.towerGroup);this.slabs.push(i)}}update(e,t){this.towerGroup.rotation.y+=t+this.autoRotationSpeed*e;for(const n of this.slabs)n.syncBodiesToTower(),n.animateDebris(e)}onSoftHit(e){const t=e.slab;return!t||t.isBroken?!1:(t.breakWholeSlab(this.particleSystem),this.slabsBroken++,!0)}allDone(){return this.slabsBroken>=this.totalSlabs}dispose(){for(const e of this.slabs)e.dispose();this.slabs=[],this.scene.remove(this.towerGroup)}}class sv{constructor(e){this.scene=e;const t=.22,n=new Ni(t,t,200,16),i=new Li({color:15397887,emissive:1188410,emissiveIntensity:.12,shininess:140});i.fog=!1,this.mesh=new xt(n,i),this.mesh.castShadow=!1,this.mesh.receiveShadow=!1,this.mesh.position.set(0,-90,0),this.scene.add(this.mesh)}}const Xt={IDLE:"IDLE",PLAYING:"PLAYING",DEAD:"DEAD",WIN:"WIN"};function cr(r){return nv(r)}const hr=class hr{constructor(e,t,n,i,s,a){this.ball=e,this.tower=t,this.pole=n,this.hud=i,this.audio=s,this.audioManager=s,this.particles=a,this.state=Xt.IDLE,this.score=0,this.level=1,this.totalLevels=10,this.renderer=null,this._comboCount=0,this._comboMultiplier=1,this._lastSoftHitAt=0,this._comboTimeoutMs=1850,this._sequenceRunning=!1,this._sequenceMeshes=[],this.tower.particleSystem=this.particles,hr.instance=this}start(){var e,t;this.state=Xt.PLAYING,this._comboCount=0,this._comboMultiplier=1,this._lastSoftHitAt=0,this.hud.showPlayingUI(this.score,this.level,this.tower.totalSlabs),(t=(e=this.hud).updateCombo)==null||t.call(e,0,1,0)}notifyLandingType(e){var t,n;this.state===Xt.PLAYING&&((n=(t=this.hud).showLandingHint)==null||n.call(t,e))}onSoftHit(e){var n,i,s;if(this.state!==Xt.PLAYING)return;if(this.tower.onSoftHit(e)){const a=performance.now();a-this._lastSoftHitAt<=this._comboTimeoutMs?this._comboCount+=1:this._comboCount=1,this._lastSoftHitAt=a,this._comboMultiplier=Math.min(4,1+Math.floor(Math.max(0,this._comboCount-1)/4));const l=3*this._comboMultiplier;this.score+=l,this.hud.updateProgress(this.tower.slabsBroken,this.tower.totalSlabs,this.score),(i=(n=this.hud).updateCombo)==null||i.call(n,this._comboCount,this._comboMultiplier,l),(s=this.audioManager)==null||s.play("break"),this.tower.allDone()&&this._levelComplete()}}onHardHit(e){var t,n,i,s,a;this.state===Xt.PLAYING&&(this._comboCount=0,this._comboMultiplier=1,this._lastSoftHitAt=0,(t=this.audioManager)==null||t.play("bounce"),(i=(n=this.renderer)==null?void 0:n.triggerShake)==null||i.call(n,.3),this.score=Math.max(0,this.score-3),this.hud.updateProgress(this.tower.slabsBroken,this.tower.totalSlabs,this.score),(a=(s=this.hud).updateCombo)==null||a.call(s,0,1,0))}restart(){var e,t;this._clearCompletionSequence();for(const n of this.tower.slabs){for(const i of n.debris)this.tower.scene.remove(i.mesh),(e=i.mesh.geometry)==null||e.dispose(),(t=i.mesh.material)==null||t.dispose();n.debris=[]}this._comboCount=0,this._comboMultiplier=1,this._lastSoftHitAt=0,this.ball.reset(this.level),this.tower.buildLevel(cr(this.level)),this.start()}nextLevel(){var e,t;this._clearCompletionSequence();for(const n of this.tower.slabs){for(const i of n.debris)this.tower.scene.remove(i.mesh),(e=i.mesh.geometry)==null||e.dispose(),(t=i.mesh.material)==null||t.dispose();n.debris=[]}this._comboCount=0,this._comboMultiplier=1,this._lastSoftHitAt=0,this.level=Math.min(this.level+1,this.totalLevels),this.ball.reset(this.level),this.tower.buildLevel(cr(this.level)),this.start()}async _levelComplete(){var e;if(!this._sequenceRunning){this.state=Xt.WIN,(e=this.audioManager)==null||e.play("win"),this._sequenceRunning=!0;try{await this._runLevelCompleteSequence()}finally{this._sequenceRunning=!1}}}async _runLevelCompleteSequence(){console.log("Starting level complete sequence");try{const e=this.tower.scene;if(!e){this.hud.showLevelComplete(this.score,this.level,this.totalLevels,1);return}const n=-(this.tower.totalSlabs*.62)-.4-.8,i=n-1.8,s=i-2.4;this._spawnConfettiBurst(e,this.ball.mesh.position.y+.2);const a=this._createCheckeredPlatform();a.position.set(0,n,0),e.add(a),this._sequenceMeshes.push(a),console.log("Creating wheel...");const l=this._createMultiplierWheel();l.group.position.set(0,i,0),e.add(l.group),this._sequenceMeshes.push(l.group),console.log("Spinning wheel..."),await this._spinWheel(l.group,2e3),console.log("Wheel spin complete, animating ball to wheel..."),await this._animateBallToY(i+.75,900);const h=this._getWheelIndex(l.group.rotation.y,l.multipliers.length),u=l.multipliers[h]||1;console.log(`Got multiplier: ${u}`),this.score+=u,this.hud.updateProgress(this.tower.slabsBroken,this.tower.totalSlabs,this.score),console.log("Creating cup...");const f=this._createCup();f.position.set(0,s,0),e.add(f),this._sequenceMeshes.push(f),console.log("Animating ball to cup..."),await this._animateBallToY(s+.45,900),this._spawnConfettiBurst(e,s+.8),console.log("Showing level complete dialog"),this.hud.showLevelComplete(this.score,this.level,this.totalLevels,u)}catch(e){console.error("Error in level complete sequence:",e),this.hud.showLevelComplete(this.score,this.level,this.totalLevels,1)}}_spawnConfettiBurst(e,t){const n=[16699242,8377542,8898808,16758689,13809407,16777215],i=[];for(let l=0;l<60;l++){const h=new xt(new ri(.09,.03,.05),new ds({color:n[l%n.length],transparent:!0,opacity:1}));h.position.set((Math.random()-.5)*3.2,t+Math.random()*.6,(Math.random()-.5)*3.2),e.add(h),this._sequenceMeshes.push(h),i.push({mesh:h,vx:(Math.random()-.5)*2.2,vy:3+Math.random()*3,vz:(Math.random()-.5)*2.2,life:1.6+Math.random()*.6})}let s=performance.now();const a=l=>{const h=Math.min((l-s)/1e3,.033);s=l;let u=!1;for(const f of i)f.life<=0||(u=!0,f.life-=h,f.vy-=8*h,f.mesh.position.x+=f.vx*h,f.mesh.position.y+=f.vy*h,f.mesh.position.z+=f.vz*h,f.mesh.rotation.x+=h*7,f.mesh.rotation.z+=h*5,f.mesh.material.opacity=Math.max(0,f.life/1.2));u&&requestAnimationFrame(a)};requestAnimationFrame(a)}_createCheckeredPlatform(){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d"),i=128/8;for(let h=0;h<8;h++)for(let u=0;u<8;u++)n.fillStyle=(u+h)%2===0?"#eaf5ff":"#d9ebe6",n.fillRect(u*i,h*i,i,i);const s=new xo(t);s.wrapS=ls,s.wrapT=ls,s.repeat.set(2,2);const a=new xt(new Ni(2.35,2.35,.24,36),new Li({map:s,color:15266303,shininess:80})),l=this._makeTextSprite("!","#ff8b6b",128,"bold 84px Arial Rounded MT Bold");return l.position.set(0,.22,0),a.add(l),a}_createMultiplierWheel(){const e=new Jn,t=2,n=8,i=[1,2,3,4,5,6,4,3],s=[7129780,7585264,16699267,16752516,7129780,7585264,16699267,16752516],a=new xt(new Ni(t+.14,t+.14,.22,40),new Li({color:2832207}));e.add(a);for(let l=0;l<n;l++){const h=l/n*Math.PI*2,u=Math.PI*2/n,f=new xt(new _r(t,28,h,u),new Li({color:s[l],side:Kt}));f.rotation.x=-Math.PI/2,f.position.y=.12,e.add(f);const o=h+u*.5,c=this._makeTextSprite(`x${i[l]}`,"#ffffff",160,"bold 56px Arial Rounded MT Bold");c.position.set(Math.cos(o)*1.2,.24,Math.sin(o)*1.2),e.add(c)}return{group:e,multipliers:i}}_makeTextSprite(e,t="#ffffff",n=256,i="bold 64px Arial"){const s=document.createElement("canvas");s.width=n,s.height=n;const a=s.getContext("2d");a.clearRect(0,0,n,n),a.font=i,a.textAlign="center",a.textBaseline="alphabetic",a.fillStyle=t;const l=String(e).split(`
`),h=Math.round(n*.24),u=h*l.length;let f=n*.5-u*.5+h*.78;for(const m of l)a.fillText(m,n/2,f),f+=h;const o=new xo(s),c=new Io({map:o,transparent:!0}),d=new yc(c);return d.scale.set(.8,.8,.8),d}_spinWheel(e,t=2e3){return new Promise(n=>{const i=performance.now();let s=i,a,l=!1;const h=u=>{if(l)return;const f=Math.min((u-i)/t,1),o=Math.min((u-s)/1e3,.033);s=u;const c=yn.lerp(12,.6,f);e.rotation.y+=c*o,f<1?a=requestAnimationFrame(h):(l=!0,console.log("Wheel spin complete"),n())};a=requestAnimationFrame(h),setTimeout(()=>{l||(l=!0,cancelAnimationFrame(a),console.warn("Wheel spin timeout reached"),n())},t+1e3)})}_getWheelIndex(e,t){const n=Math.PI*2,i=(e%n+n)%n,s=n/t;return Math.floor((n-i)%n/s)}_animateBallToY(e,t=900){return new Promise(n=>{const i=this.ball.body.position.y,s=performance.now();let a,l=!1;const h=u=>{if(l)return;const f=Math.min((u-s)/t,1),o=1-Math.pow(1-f,3),c=yn.lerp(i,e,o);this.ball.body.position.set(0,c,0),this.ball.body.velocity.set(0,0,0),this.ball.mesh.position.set(0,c,0),f<1?a=requestAnimationFrame(h):(l=!0,console.log(`Ball animation to Y=${e} complete`),n())};a=requestAnimationFrame(h),setTimeout(()=>{l||(l=!0,cancelAnimationFrame(a),console.warn(`Ball animation to Y=${e} timeout reached`),this.ball.body.position.set(0,e,0),this.ball.body.velocity.set(0,0,0),this.ball.mesh.position.set(0,e,0),n())},t+1e3)})}_createCup(){const e=new Jn,t=new xt(new Ni(.55,.92,2.2,24,1,!0),new Li({color:15829616,side:Kt}));e.add(t);const n=this._makeTextSprite(`${this.level}
/${this.totalLevels}`,"#ffffff",256,"bold 58px Arial Rounded MT Bold");return n.position.set(0,.2,.95),e.add(n),e}_clearCompletionSequence(){var t;const e=this.tower.scene;for(const n of this._sequenceMeshes)n!=null&&n.parent&&n.parent.remove(n),(t=n==null?void 0:n.traverse)==null||t.call(n,i=>{var s,a;(s=i.geometry)!=null&&s.dispose&&i.geometry.dispose(),(a=i.material)!=null&&a.dispose&&i.material.dispose(),Array.isArray(i.material)&&i.material.forEach(l=>{var h;return(h=l==null?void 0:l.dispose)==null?void 0:h.call(l)})});this._sequenceMeshes=[],e&&(this.ball.mesh.position.x=0,this.ball.mesh.position.z=0)}};Vo(hr,"instance",null);let fs=hr;const Js=Object.freeze(Object.defineProperty({__proto__:null,GameManager:fs,GameState:Xt,default:fs,getLevelConfig:cr},Symbol.toStringTag,{value:"Module"})),Pn=1500;class rv{constructor(e){this.scene=e,this.positions=new Float32Array(Pn*3),this.colors=new Float32Array(Pn*3),this.velocities=new Float32Array(Pn*3),this.life=new Float32Array(Pn),this.active=new Uint8Array(Pn),this.geometry=new Nt,this.positionAttr=new Ht(this.positions,3),this.colorAttr=new Ht(this.colors,3),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("color",this.colorAttr),this.geometry.setDrawRange(0,Pn),this.material=new Mc({size:.12,vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,blending:ao}),this.points=new o_(this.geometry,this.material),this.scene.add(this.points)}_findFreeIndex(){for(let e=0;e<Pn;e+=1)if(!this.active[e])return e;return-1}burst(e,t,n=20,i=!1){const s=new Le(t),a=i?1.9:.85,l=i?8:3.6,h=i?4.5:2.2;for(let u=0;u<n;u+=1){const f=this._findFreeIndex();if(f===-1)break;this.active[f]=1,this.life[f]=i?.9+Math.random()*.35:.45+Math.random()*.3;const o=f*3;this.positions[o]=e.x+(Math.random()-.5)*.18,this.positions[o+1]=e.y+.05,this.positions[o+2]=e.z+(Math.random()-.5)*.18;const c=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1),m=Math.sin(d)*Math.cos(c),g=Math.abs(Math.cos(d)),_=Math.sin(d)*Math.sin(c),p=l+Math.random()*(i?4.2:2.4);this.velocities[o]=m*p*a,this.velocities[o+1]=g*p+h,this.velocities[o+2]=_*p*a,this.colors[o]=s.r,this.colors[o+1]=s.g,this.colors[o+2]=s.b}this.positionAttr.needsUpdate=!0,this.colorAttr.needsUpdate=!0}update(e){for(let n=0;n<Pn;n+=1){if(!this.active[n])continue;this.life[n]-=e;const i=n*3;if(this.life[n]<=0){this.active[n]=0,this.positions[i+1]=-9999;continue}this.velocities[i]*=.985,this.velocities[i+1]=this.velocities[i+1]*.985-13.5*e,this.velocities[i+2]*=.985,this.positions[i]+=this.velocities[i]*e,this.positions[i+1]+=this.velocities[i+1]*e,this.positions[i+2]+=this.velocities[i+2]*e}this.positionAttr.needsUpdate=!0}dispose(){this.scene.remove(this.points),this.geometry.dispose(),this.material.dispose()}}class ov{constructor(e){this.uiLayer=e,this.root=e,this._injectStyles(),this.root.innerHTML=`
  <div id="sbp-bar-wrap" class="sbp-bar-wrap">
    <div id="sbp-lv-left" class="sbp-level-pill">1</div>
    <div class="sbp-progress-shell"><div id="sbp-bar" class="sbp-progress-fill"></div></div>
    <div id="sbp-lv-right" class="sbp-level-pill">2</div>
  </div>

  <div id="sbp-landing-hint" class="sbp-landing-hint">SOFT SPOT</div>
  <div id="sbp-break-mode" class="sbp-break-mode">HOLD TO BREAK</div>

  <div id="sbp-combo-wrap" class="sbp-combo-wrap">
    <div class="sbp-combo-label">COMBO</div>
    <div id="sbp-combo-value" class="sbp-combo-value">x1</div>
  </div>

  <div id="sbp-combo-toast" class="sbp-combo-toast">+3</div>

  <div id="sbp-score-wrap" class="sbp-score-wrap">
    <div class="sbp-score-caption">SCORE</div>
    <div id="sbp-score" class="sbp-score-value">0</div>
  </div>

  <div id="sbp-overlay" class="sbp-overlay"></div>
`,this._lvLeft=document.getElementById("sbp-lv-left"),this._lvRight=document.getElementById("sbp-lv-right"),this._bar=document.getElementById("sbp-bar"),this._score=document.getElementById("sbp-score"),this._overlay=document.getElementById("sbp-overlay"),this._landingHint=document.getElementById("sbp-landing-hint"),this._breakMode=document.getElementById("sbp-break-mode"),this._comboWrap=document.getElementById("sbp-combo-wrap"),this._comboValue=document.getElementById("sbp-combo-value"),this._comboToast=document.getElementById("sbp-combo-toast"),this._landingHintTimer=null,this._comboTimer=null,this._comboToastTimer=null}_injectStyles(){if(document.getElementById("sbp-hud-style"))return;const e=document.createElement("style");e.id="sbp-hud-style",e.textContent=`
      .sbp-bar-wrap{
        position:absolute;
        top:20px;
        left:50%;
        transform:translateX(-50%);
        display:flex;
        align-items:center;
        gap:12px;
        pointer-events:none;
        z-index:20;
        padding:10px 16px;
        border-radius:999px;
        border:2px solid rgba(255,255,255,0.6);
        background:rgba(255,255,255,0.85);
        box-shadow:0 8px 32px rgba(196,69,105,0.18), 0 4px 16px rgba(255,107,157,0.12);
        backdrop-filter:blur(16px);
        -webkit-backdrop-filter:blur(16px);
        transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
      }

      .sbp-level-pill{
        width:44px;
        height:44px;
        border-radius:50%;
        background:linear-gradient(135deg,#FF6B9D 0%,#FF8DB3 100%);
        color:#FFFFFF;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:19px;
        font-weight:800;
        letter-spacing:0.5px;
        text-shadow:0 2px 4px rgba(196,69,105,0.3);
        box-shadow:inset 0 2px 4px rgba(255,255,255,0.4), 0 6px 20px rgba(255,107,157,0.35);
        transition:transform 0.2s ease;
      }
      
      .sbp-level-pill:hover{
        transform:scale(1.05);
      }

      .sbp-progress-shell{
        width:200px;
        height:14px;
        border-radius:999px;
        overflow:hidden;
        background:rgba(255,182,193,0.2);
        border:1.5px solid rgba(255,255,255,0.5);
        box-shadow:inset 0 2px 6px rgba(196,69,105,0.1);
      }

      .sbp-progress-fill{
        width:0%;
        height:100%;
        border-radius:999px;
        background:linear-gradient(90deg,#FF6B9D 0%,#FEC260 50%,#FFD700 100%);
        box-shadow:0 0 12px rgba(255,107,157,0.5);
        transition:width 0.4s cubic-bezier(0.4,0,0.2,1);
        position:relative;
      }
      
      .sbp-progress-fill::after{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0));
        border-radius:999px;
        animation:shimmer 2s infinite;
      }
      
      @keyframes shimmer{
        0%{transform:translateX(-100%);}
        100%{transform:translateX(100%);}
      }

      .sbp-score-wrap{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-52%);
        display:flex;
        flex-direction:column;
        align-items:center;
        pointer-events:none;
        z-index:12;
      }

      .sbp-score-caption{
        color:rgba(238,248,255,0.58);
        font-size:12px;
        font-weight:700;
        letter-spacing:3px;
        margin-bottom:5px;
      }

      .sbp-score-value{
        color:rgba(255,255,255,0.24);
        font-size:clamp(64px,13vw,124px);
        font-weight:800;
        letter-spacing:-4px;
        line-height:0.9;
        text-shadow:0 10px 24px rgba(12,24,66,0.22);
        transition:transform 0.12s ease-out;
      }

      .sbp-landing-hint{
        position:absolute;
    		top:84px;
        left:50%;
        transform:translateX(-50%) scale(0.92);
        min-width:132px;
    		padding:8px 18px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,0.3);
        background:rgba(14,22,50,0.42);
        color:#e9f3ff;
        text-align:center;
    		font-size:13px;
        font-weight:800;
        letter-spacing:1.2px;
        opacity:0;
        pointer-events:none;
        z-index:22;
        box-shadow:0 10px 20px rgba(13,24,60,0.35);
        transition:opacity 0.14s ease, transform 0.14s ease, background 0.14s ease, border-color 0.14s ease;
      }

      .sbp-break-mode{
        position:absolute;
        top:124px;
        left:50%;
        transform:translateX(-50%);
        padding:7px 16px;
        border-radius:999px;
        border:1px solid rgba(203,224,255,0.45);
        background:rgba(18,30,62,0.2);
        color:rgba(240,248,255,0.92);
        font-size:11px;
        font-weight:800;
        letter-spacing:1.4px;
        opacity:0.72;
        transition:opacity 0.14s ease, transform 0.14s ease, background 0.14s ease, border-color 0.14s ease;
      }

      .sbp-break-mode.is-active{
        opacity:1;
        transform:translateX(-50%) scale(1.03);
        background:linear-gradient(135deg, rgba(121,245,219,0.34), rgba(118,191,255,0.26));
        border-color:rgba(167,241,226,0.86);
      }

      .sbp-combo-wrap{
        position:absolute;
        right:20px;
        top:20px;
        width:90px;
        border-radius:18px;
        border:2px solid rgba(255,255,255,0.6);
        background:rgba(255,255,255,0.85);
        backdrop-filter:blur(16px);
        box-shadow:0 8px 24px rgba(196,69,105,0.15);
        padding:12px 10px;
        pointer-events:none;
        z-index:20;
        opacity:0.95;
        transition:all 0.3s ease;
      }
      
      .sbp-combo-wrap:hover{
        transform:scale(1.05);
      }

      .sbp-combo-label{
        color:#C44569;
        font-size:11px;
        font-weight:800;
        letter-spacing:1.8px;
        text-align:center;
        text-shadow:0 1px 3px rgba(255,255,255,0.8);
      }

      .sbp-combo-value{
        margin-top:4px;
        color:#FF6B9D;
        font-size:28px;
        font-weight:900;
        line-height:1;
        text-align:center;
        text-shadow:0 4px 12px rgba(255,107,157,0.3);
        transition:transform 0.15s cubic-bezier(0.4,0,0.2,1), color 0.2s ease;
      }

      .sbp-combo-toast{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-82%) scale(0.92);
        padding:10px 18px;
        border-radius:999px;
        border:2px solid rgba(255,215,0,0.7);
        background:linear-gradient(135deg,rgba(255,107,157,0.95),rgba(254,194,96,0.95));
        color:#FFFFFF;
        font-size:18px;
        font-weight:900;
        letter-spacing:1.2px;
        opacity:0;
        pointer-events:none;
        z-index:21;
        box-shadow:0 8px 28px rgba(255,107,157,0.4), 0 0 20px rgba(255,215,0,0.3);
        transition:opacity 0.2s ease, transform 0.2s ease;
      }

      .sbp-overlay{
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        pointer-events:none;
        z-index:25;
        background:rgba(255,245,247,0.4);
        backdrop-filter:blur(8px);
        opacity:0;
        transition:opacity 0.4s ease;
      }
      
      .sbp-overlay.show{
        opacity:1;
      }

      .sbp-card{
        width:min(88vw,460px);
        border-radius:28px;
        border:3px solid rgba(255,255,255,0.8);
        background:rgba(255,255,255,0.95);
        box-shadow:0 20px 60px rgba(196,69,105,0.25), 0 8px 32px rgba(255,107,157,0.15);
        backdrop-filter:blur(12px);
        padding:22px 22px 20px;
        color:#f4f8ff;
        text-align:center;
        animation:sbpFloatIn 320ms cubic-bezier(.2,.8,.2,1);
      }

      @keyframes sbpFloatIn{
        0%{opacity:0; transform:translateY(14px) scale(0.98);}
        100%{opacity:1; transform:translateY(0) scale(1);}
      }

      .sbp-title{
        font-family:"Space Grotesk","Segoe UI",sans-serif;
        font-weight:700;
        letter-spacing:1.2px;
        text-transform:uppercase;
      }

      .sbp-chip-row{
        margin-top:16px;
        display:flex;
        justify-content:center;
        gap:10px;
      }

      .sbp-chip{
        padding:7px 12px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,0.25);
        background:rgba(7,12,38,0.22);
        font-size:12px;
        font-weight:700;
        letter-spacing:0.8px;
      }

      .sbp-primary-btn{
        margin-top:16px;
        border:none;
        border-radius:999px;
        padding:12px 24px;
        cursor:pointer;
        color:#072041;
        font-size:15px;
        font-weight:800;
        letter-spacing:1px;
        background:linear-gradient(135deg,#80f0dd,#69c4ff);
        box-shadow:0 8px 18px rgba(27,112,173,0.35);
      }

      @media (max-width:640px){
        .sbp-bar-wrap{top:12px; padding:6px 10px; gap:8px;}
        .sbp-level-pill{width:38px; height:38px; font-size:16px;}
        .sbp-progress-shell{width:156px;}
		.sbp-landing-hint{top:72px; font-size:11px; padding:7px 14px;}
		.sbp-break-mode{top:106px; font-size:10px; padding:6px 13px;}
		.sbp-combo-wrap{top:12px; right:12px; width:78px; padding:7px 7px 6px;}
		.sbp-combo-value{font-size:23px;}
        .sbp-card{width:min(92vw,420px); border-radius:20px; padding:20px 16px 18px;}
      }
    `,document.head.appendChild(e)}showPlayingUI(e,t,n){this._lvLeft.textContent=t,this._lvRight.textContent=t+1,this._bar.style.width="0%",this._score.textContent=e,this.updateCombo(0,1,0),this.setBreakMode(!1),this._landingHint&&(this._landingHint.style.opacity="0",this._landingHint.style.transform="translateX(-50%) scale(0.92)"),this._overlay.innerHTML="",this._overlay.style.background="transparent",this._overlay.style.pointerEvents="none"}showLandingHint(e){if(!this._landingHint)return;const t=e==="soft";this._landingHint.textContent=t?"SOFT SPOT":"HARD SPOT",this._landingHint.style.background=t?"linear-gradient(130deg, rgba(86,242,207,0.32), rgba(88,173,255,0.2))":"linear-gradient(130deg, rgba(255,199,132,0.3), rgba(68,78,108,0.3))",this._landingHint.style.borderColor=t?"rgba(126,246,225,0.62)":"rgba(255,214,154,0.64)",this._landingHint.style.opacity="1",this._landingHint.style.transform="translateX(-50%) scale(1)",this._landingHintTimer&&clearTimeout(this._landingHintTimer),this._landingHintTimer=setTimeout(()=>{this._landingHint.style.opacity="0",this._landingHint.style.transform="translateX(-50%) scale(0.94)"},900)}setBreakMode(e){this._breakMode&&this._breakMode.classList.toggle("is-active",!!e)}updateCombo(e,t=1,n=0){if(!this._comboWrap||!this._comboValue)return;const i=Math.max(0,e|0),s=Math.max(1,t|0),a=i>1;this._comboWrap.style.opacity=a?"1":"0.84",this._comboValue.textContent=`x${s}`,this._comboValue.style.color=s>=3?"#fff0c7":"#ffffff",this._comboValue.style.transform=a?"scale(1.08)":"scale(1)",this._comboTimer&&clearTimeout(this._comboTimer),this._comboTimer=setTimeout(()=>{this._comboValue.style.transform="scale(1)"},140),n>0&&this._comboToast&&(this._comboToast.textContent=`+${n}`,this._comboToast.style.opacity="1",this._comboToast.style.transform="translate(-50%,-96%) scale(1)",this._comboToastTimer&&clearTimeout(this._comboToastTimer),this._comboToastTimer=setTimeout(()=>{this._comboToast.style.opacity="0",this._comboToast.style.transform="translate(-50%,-82%) scale(0.92)"},340))}updateProgress(e,t,n){const i=t>0?e/t*100:0;this._bar.style.width=i+"%",this._score.textContent=n,this._score.style.transform="scale(1.08)",setTimeout(()=>{this._score.style.transform="scale(1)"},120)}showGameOver(e){this._overlay.style.pointerEvents="auto",this._overlay.style.background="rgba(7,11,28,0.34)",this._overlay.innerHTML=`
      <div class="sbp-card">
        <div class="sbp-title" style="font-size:40px;color:#ffe5dd;">Level Failed</div>
        <div style="margin-top:10px;font-size:17px;opacity:0.9;">Score</div>
        <div style="font-size:42px;font-weight:800;line-height:1;margin-top:4px;">${e}</div>
        <button id="sbp-retry-btn" class="sbp-primary-btn">Retry</button>
      </div>`;const t=this._overlay.querySelector("#sbp-retry-btn");t==null||t.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("game:restart"))})}showLevelComplete(e,t,n,i=1){this._overlay.style.pointerEvents="auto",this._overlay.style.background="rgba(7,11,28,0.26)",this._overlay.innerHTML=`
      <div class="sbp-card">
        <div class="sbp-title" style="font-size:42px;">Complete</div>
        <div style="margin-top:8px;font-size:17px;font-weight:700;opacity:0.96;">x${i} bonus</div>
        <div style="margin-top:8px;font-size:26px;font-weight:800;">${t}/${n}</div>
        <div style="margin-top:10px;font-size:24px;font-weight:800;">Score ${e}</div>
        <div style="margin-top:16px;font-size:13px;letter-spacing:2.3px;opacity:0.84;">TAP TO CONTINUE</div>
      </div>`;const s=()=>{window.dispatchEvent(new CustomEvent("game:next")),this._overlay.removeEventListener("pointerdown",s)};this._overlay.addEventListener("pointerdown",s)}showStartScreen(){this._overlay.style.pointerEvents="auto",this._overlay.style.background="rgba(9,14,32,0.24)",this._overlay.innerHTML=`
      <div class="sbp-card">
        <div class="sbp-title" style="font-size:52px;line-height:0.92;">Stack Ball</div>
        <div style="margin-top:10px;font-size:14px;letter-spacing:3px;opacity:0.86;">SOFT FLOW . FAST DROP</div>
        <div class="sbp-chip-row">
          <div class="sbp-chip">DRAG TO ROTATE</div>
          <div class="sbp-chip">HOLD TO BREAK</div>
          <div class="sbp-chip">BUILD COMBO</div>
        </div>
        <div style="margin-top:14px;font-size:12px;letter-spacing:2.1px;opacity:0.75;">TAP ANYWHERE TO PLAY</div>
      </div>`}flashDanger(){const e=document.createElement("div");e.style.cssText=`
      position:absolute;
      inset:0;
      background:rgba(255,201,130,0.24);
      pointer-events:none;
      opacity:1;
      transition:opacity 0.35s ease-out;
      z-index:30;
    `,this.root.appendChild(e),requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.style.opacity="0"})}),setTimeout(()=>e.remove(),450)}}var is=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Mo={};/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(r){(function(){var e=function(){this.init()};e.prototype={init:function(){var o=this||t;return o._counter=1e3,o._html5AudioPool=[],o.html5PoolSize=10,o._codecs={},o._howls=[],o._muted=!1,o._volume=1,o._canPlayEvent="canplaythrough",o._navigator=typeof window<"u"&&window.navigator?window.navigator:null,o.masterGain=null,o.noAudio=!1,o.usingWebAudio=!0,o.autoSuspend=!0,o.ctx=null,o.autoUnlock=!0,o._setup(),o},volume:function(o){var c=this||t;if(o=parseFloat(o),c.ctx||f(),typeof o<"u"&&o>=0&&o<=1){if(c._volume=o,c._muted)return c;c.usingWebAudio&&c.masterGain.gain.setValueAtTime(o,t.ctx.currentTime);for(var d=0;d<c._howls.length;d++)if(!c._howls[d]._webAudio)for(var m=c._howls[d]._getSoundIds(),g=0;g<m.length;g++){var _=c._howls[d]._soundById(m[g]);_&&_._node&&(_._node.volume=_._volume*o)}return c}return c._volume},mute:function(o){var c=this||t;c.ctx||f(),c._muted=o,c.usingWebAudio&&c.masterGain.gain.setValueAtTime(o?0:c._volume,t.ctx.currentTime);for(var d=0;d<c._howls.length;d++)if(!c._howls[d]._webAudio)for(var m=c._howls[d]._getSoundIds(),g=0;g<m.length;g++){var _=c._howls[d]._soundById(m[g]);_&&_._node&&(_._node.muted=o?!0:_._muted)}return c},stop:function(){for(var o=this||t,c=0;c<o._howls.length;c++)o._howls[c].stop();return o},unload:function(){for(var o=this||t,c=o._howls.length-1;c>=0;c--)o._howls[c].unload();return o.usingWebAudio&&o.ctx&&typeof o.ctx.close<"u"&&(o.ctx.close(),o.ctx=null,f()),o},codecs:function(o){return(this||t)._codecs[o.replace(/^x-/,"")]},_setup:function(){var o=this||t;if(o.state=o.ctx&&o.ctx.state||"suspended",o._autoSuspend(),!o.usingWebAudio)if(typeof Audio<"u")try{var c=new Audio;typeof c.oncanplaythrough>"u"&&(o._canPlayEvent="canplay")}catch{o.noAudio=!0}else o.noAudio=!0;try{var c=new Audio;c.muted&&(o.noAudio=!0)}catch{}return o.noAudio||o._setupCodecs(),o},_setupCodecs:function(){var o=this||t,c=null;try{c=typeof Audio<"u"?new Audio:null}catch{return o}if(!c||typeof c.canPlayType!="function")return o;var d=c.canPlayType("audio/mpeg;").replace(/^no$/,""),m=o._navigator?o._navigator.userAgent:"",g=m.match(/OPR\/(\d+)/g),_=g&&parseInt(g[0].split("/")[1],10)<33,p=m.indexOf("Safari")!==-1&&m.indexOf("Chrome")===-1,v=m.match(/Version\/(.*?) /),x=p&&v&&parseInt(v[1],10)<15;return o._codecs={mp3:!!(!_&&(d||c.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!d,opus:!!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(c.canPlayType('audio/wav; codecs="1"')||c.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!c.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!c.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(c.canPlayType("audio/x-m4a;")||c.canPlayType("audio/m4a;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(c.canPlayType("audio/x-m4b;")||c.canPlayType("audio/m4b;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(c.canPlayType("audio/x-mp4;")||c.canPlayType("audio/mp4;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!x&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!x&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!c.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(c.canPlayType("audio/x-flac;")||c.canPlayType("audio/flac;")).replace(/^no$/,"")},o},_unlockAudio:function(){var o=this||t;if(!(o._audioUnlocked||!o.ctx)){o._audioUnlocked=!1,o.autoUnlock=!1,!o._mobileUnloaded&&o.ctx.sampleRate!==44100&&(o._mobileUnloaded=!0,o.unload()),o._scratchBuffer=o.ctx.createBuffer(1,1,22050);var c=function(d){for(;o._html5AudioPool.length<o.html5PoolSize;)try{var m=new Audio;m._unlocked=!0,o._releaseHtml5Audio(m)}catch{o.noAudio=!0;break}for(var g=0;g<o._howls.length;g++)if(!o._howls[g]._webAudio)for(var _=o._howls[g]._getSoundIds(),p=0;p<_.length;p++){var v=o._howls[g]._soundById(_[p]);v&&v._node&&!v._node._unlocked&&(v._node._unlocked=!0,v._node.load())}o._autoResume();var x=o.ctx.createBufferSource();x.buffer=o._scratchBuffer,x.connect(o.ctx.destination),typeof x.start>"u"?x.noteOn(0):x.start(0),typeof o.ctx.resume=="function"&&o.ctx.resume(),x.onended=function(){x.disconnect(0),o._audioUnlocked=!0,document.removeEventListener("touchstart",c,!0),document.removeEventListener("touchend",c,!0),document.removeEventListener("click",c,!0),document.removeEventListener("keydown",c,!0);for(var S=0;S<o._howls.length;S++)o._howls[S]._emit("unlock")}};return document.addEventListener("touchstart",c,!0),document.addEventListener("touchend",c,!0),document.addEventListener("click",c,!0),document.addEventListener("keydown",c,!0),o}},_obtainHtml5Audio:function(){var o=this||t;if(o._html5AudioPool.length)return o._html5AudioPool.pop();var c=new Audio().play();return c&&typeof Promise<"u"&&(c instanceof Promise||typeof c.then=="function")&&c.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(o){var c=this||t;return o._unlocked&&c._html5AudioPool.push(o),c},_autoSuspend:function(){var o=this;if(!(!o.autoSuspend||!o.ctx||typeof o.ctx.suspend>"u"||!t.usingWebAudio)){for(var c=0;c<o._howls.length;c++)if(o._howls[c]._webAudio){for(var d=0;d<o._howls[c]._sounds.length;d++)if(!o._howls[c]._sounds[d]._paused)return o}return o._suspendTimer&&clearTimeout(o._suspendTimer),o._suspendTimer=setTimeout(function(){if(o.autoSuspend){o._suspendTimer=null,o.state="suspending";var m=function(){o.state="suspended",o._resumeAfterSuspend&&(delete o._resumeAfterSuspend,o._autoResume())};o.ctx.suspend().then(m,m)}},3e4),o}},_autoResume:function(){var o=this;if(!(!o.ctx||typeof o.ctx.resume>"u"||!t.usingWebAudio))return o.state==="running"&&o.ctx.state!=="interrupted"&&o._suspendTimer?(clearTimeout(o._suspendTimer),o._suspendTimer=null):o.state==="suspended"||o.state==="running"&&o.ctx.state==="interrupted"?(o.ctx.resume().then(function(){o.state="running";for(var c=0;c<o._howls.length;c++)o._howls[c]._emit("resume")}),o._suspendTimer&&(clearTimeout(o._suspendTimer),o._suspendTimer=null)):o.state==="suspending"&&(o._resumeAfterSuspend=!0),o}};var t=new e,n=function(o){var c=this;if(!o.src||o.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}c.init(o)};n.prototype={init:function(o){var c=this;return t.ctx||f(),c._autoplay=o.autoplay||!1,c._format=typeof o.format!="string"?o.format:[o.format],c._html5=o.html5||!1,c._muted=o.mute||!1,c._loop=o.loop||!1,c._pool=o.pool||5,c._preload=typeof o.preload=="boolean"||o.preload==="metadata"?o.preload:!0,c._rate=o.rate||1,c._sprite=o.sprite||{},c._src=typeof o.src!="string"?o.src:[o.src],c._volume=o.volume!==void 0?o.volume:1,c._xhr={method:o.xhr&&o.xhr.method?o.xhr.method:"GET",headers:o.xhr&&o.xhr.headers?o.xhr.headers:null,withCredentials:o.xhr&&o.xhr.withCredentials?o.xhr.withCredentials:!1},c._duration=0,c._state="unloaded",c._sounds=[],c._endTimers={},c._queue=[],c._playLock=!1,c._onend=o.onend?[{fn:o.onend}]:[],c._onfade=o.onfade?[{fn:o.onfade}]:[],c._onload=o.onload?[{fn:o.onload}]:[],c._onloaderror=o.onloaderror?[{fn:o.onloaderror}]:[],c._onplayerror=o.onplayerror?[{fn:o.onplayerror}]:[],c._onpause=o.onpause?[{fn:o.onpause}]:[],c._onplay=o.onplay?[{fn:o.onplay}]:[],c._onstop=o.onstop?[{fn:o.onstop}]:[],c._onmute=o.onmute?[{fn:o.onmute}]:[],c._onvolume=o.onvolume?[{fn:o.onvolume}]:[],c._onrate=o.onrate?[{fn:o.onrate}]:[],c._onseek=o.onseek?[{fn:o.onseek}]:[],c._onunlock=o.onunlock?[{fn:o.onunlock}]:[],c._onresume=[],c._webAudio=t.usingWebAudio&&!c._html5,typeof t.ctx<"u"&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(c),c._autoplay&&c._queue.push({event:"play",action:function(){c.play()}}),c._preload&&c._preload!=="none"&&c.load(),c},load:function(){var o=this,c=null;if(t.noAudio){o._emit("loaderror",null,"No audio support.");return}typeof o._src=="string"&&(o._src=[o._src]);for(var d=0;d<o._src.length;d++){var m,g;if(o._format&&o._format[d])m=o._format[d];else{if(g=o._src[d],typeof g!="string"){o._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}m=/^data:audio\/([^;,]+);/i.exec(g),m||(m=/\.([^.]+)$/.exec(g.split("?",1)[0])),m&&(m=m[1].toLowerCase())}if(m||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),m&&t.codecs(m)){c=o._src[d];break}}if(!c){o._emit("loaderror",null,"No codec support for selected audio sources.");return}return o._src=c,o._state="loading",window.location.protocol==="https:"&&c.slice(0,5)==="http:"&&(o._html5=!0,o._webAudio=!1),new i(o),o._webAudio&&a(o),o},play:function(o,c){var d=this,m=null;if(typeof o=="number")m=o,o=null;else{if(typeof o=="string"&&d._state==="loaded"&&!d._sprite[o])return null;if(typeof o>"u"&&(o="__default",!d._playLock)){for(var g=0,_=0;_<d._sounds.length;_++)d._sounds[_]._paused&&!d._sounds[_]._ended&&(g++,m=d._sounds[_]._id);g===1?o=null:m=null}}var p=m?d._soundById(m):d._inactiveSound();if(!p)return null;if(m&&!o&&(o=p._sprite||"__default"),d._state!=="loaded"){p._sprite=o,p._ended=!1;var v=p._id;return d._queue.push({event:"play",action:function(){d.play(v)}}),v}if(m&&!p._paused)return c||d._loadQueue("play"),p._id;d._webAudio&&t._autoResume();var x=Math.max(0,p._seek>0?p._seek:d._sprite[o][0]/1e3),S=Math.max(0,(d._sprite[o][0]+d._sprite[o][1])/1e3-x),C=S*1e3/Math.abs(p._rate),w=d._sprite[o][0]/1e3,A=(d._sprite[o][0]+d._sprite[o][1])/1e3;p._sprite=o,p._ended=!1;var O=function(){p._paused=!1,p._seek=x,p._start=w,p._stop=A,p._loop=!!(p._loop||d._sprite[o][2])};if(x>=A){d._ended(p);return}var M=p._node;if(d._webAudio){var E=function(){d._playLock=!1,O(),d._refreshBuffer(p);var P=p._muted||d._muted?0:p._volume;M.gain.setValueAtTime(P,t.ctx.currentTime),p._playStart=t.ctx.currentTime,typeof M.bufferSource.start>"u"?p._loop?M.bufferSource.noteGrainOn(0,x,86400):M.bufferSource.noteGrainOn(0,x,S):p._loop?M.bufferSource.start(0,x,86400):M.bufferSource.start(0,x,S),C!==1/0&&(d._endTimers[p._id]=setTimeout(d._ended.bind(d,p),C)),c||setTimeout(function(){d._emit("play",p._id),d._loadQueue()},0)};t.state==="running"&&t.ctx.state!=="interrupted"?E():(d._playLock=!0,d.once("resume",E),d._clearTimer(p._id))}else{var U=function(){M.currentTime=x,M.muted=p._muted||d._muted||t._muted||M.muted,M.volume=p._volume*t.volume(),M.playbackRate=p._rate;try{var P=M.play();if(P&&typeof Promise<"u"&&(P instanceof Promise||typeof P.then=="function")?(d._playLock=!0,O(),P.then(function(){d._playLock=!1,M._unlocked=!0,c?d._loadQueue():d._emit("play",p._id)}).catch(function(){d._playLock=!1,d._emit("playerror",p._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),p._ended=!0,p._paused=!0})):c||(d._playLock=!1,O(),d._emit("play",p._id)),M.playbackRate=p._rate,M.paused){d._emit("playerror",p._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}o!=="__default"||p._loop?d._endTimers[p._id]=setTimeout(d._ended.bind(d,p),C):(d._endTimers[p._id]=function(){d._ended(p),M.removeEventListener("ended",d._endTimers[p._id],!1)},M.addEventListener("ended",d._endTimers[p._id],!1))}catch(L){d._emit("playerror",p._id,L)}};M.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(M.src=d._src,M.load());var z=window&&window.ejecta||!M.readyState&&t._navigator.isCocoonJS;if(M.readyState>=3||z)U();else{d._playLock=!0,d._state="loading";var N=function(){d._state="loaded",U(),M.removeEventListener(t._canPlayEvent,N,!1)};M.addEventListener(t._canPlayEvent,N,!1),d._clearTimer(p._id)}}return p._id},pause:function(o){var c=this;if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"pause",action:function(){c.pause(o)}}),c;for(var d=c._getSoundIds(o),m=0;m<d.length;m++){c._clearTimer(d[m]);var g=c._soundById(d[m]);if(g&&!g._paused&&(g._seek=c.seek(d[m]),g._rateSeek=0,g._paused=!0,c._stopFade(d[m]),g._node))if(c._webAudio){if(!g._node.bufferSource)continue;typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),c._cleanBuffer(g._node)}else(!isNaN(g._node.duration)||g._node.duration===1/0)&&g._node.pause();arguments[1]||c._emit("pause",g?g._id:null)}return c},stop:function(o,c){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"stop",action:function(){d.stop(o)}}),d;for(var m=d._getSoundIds(o),g=0;g<m.length;g++){d._clearTimer(m[g]);var _=d._soundById(m[g]);_&&(_._seek=_._start||0,_._rateSeek=0,_._paused=!0,_._ended=!0,d._stopFade(m[g]),_._node&&(d._webAudio?_._node.bufferSource&&(typeof _._node.bufferSource.stop>"u"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),d._cleanBuffer(_._node)):(!isNaN(_._node.duration)||_._node.duration===1/0)&&(_._node.currentTime=_._start||0,_._node.pause(),_._node.duration===1/0&&d._clearSound(_._node))),c||d._emit("stop",_._id))}return d},mute:function(o,c){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"mute",action:function(){d.mute(o,c)}}),d;if(typeof c>"u")if(typeof o=="boolean")d._muted=o;else return d._muted;for(var m=d._getSoundIds(c),g=0;g<m.length;g++){var _=d._soundById(m[g]);_&&(_._muted=o,_._interval&&d._stopFade(_._id),d._webAudio&&_._node?_._node.gain.setValueAtTime(o?0:_._volume,t.ctx.currentTime):_._node&&(_._node.muted=t._muted?!0:o),d._emit("mute",_._id))}return d},volume:function(){var o=this,c=arguments,d,m;if(c.length===0)return o._volume;if(c.length===1||c.length===2&&typeof c[1]>"u"){var g=o._getSoundIds(),_=g.indexOf(c[0]);_>=0?m=parseInt(c[0],10):d=parseFloat(c[0])}else c.length>=2&&(d=parseFloat(c[0]),m=parseInt(c[1],10));var p;if(typeof d<"u"&&d>=0&&d<=1){if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,c)}}),o;typeof m>"u"&&(o._volume=d),m=o._getSoundIds(m);for(var v=0;v<m.length;v++)p=o._soundById(m[v]),p&&(p._volume=d,c[2]||o._stopFade(m[v]),o._webAudio&&p._node&&!p._muted?p._node.gain.setValueAtTime(d,t.ctx.currentTime):p._node&&!p._muted&&(p._node.volume=d*t.volume()),o._emit("volume",p._id))}else return p=m?o._soundById(m):o._sounds[0],p?p._volume:0;return o},fade:function(o,c,d,m){var g=this;if(g._state!=="loaded"||g._playLock)return g._queue.push({event:"fade",action:function(){g.fade(o,c,d,m)}}),g;o=Math.min(Math.max(0,parseFloat(o)),1),c=Math.min(Math.max(0,parseFloat(c)),1),d=parseFloat(d),g.volume(o,m);for(var _=g._getSoundIds(m),p=0;p<_.length;p++){var v=g._soundById(_[p]);if(v){if(m||g._stopFade(_[p]),g._webAudio&&!v._muted){var x=t.ctx.currentTime,S=x+d/1e3;v._volume=o,v._node.gain.setValueAtTime(o,x),v._node.gain.linearRampToValueAtTime(c,S)}g._startFadeInterval(v,o,c,d,_[p],typeof m>"u")}}return g},_startFadeInterval:function(o,c,d,m,g,_){var p=this,v=c,x=d-c,S=Math.abs(x/.01),C=Math.max(4,S>0?m/S:m),w=Date.now();o._fadeTo=d,o._interval=setInterval(function(){var A=(Date.now()-w)/m;w=Date.now(),v+=x*A,v=Math.round(v*100)/100,x<0?v=Math.max(d,v):v=Math.min(d,v),p._webAudio?o._volume=v:p.volume(v,o._id,!0),_&&(p._volume=v),(d<c&&v<=d||d>c&&v>=d)&&(clearInterval(o._interval),o._interval=null,o._fadeTo=null,p.volume(d,o._id),p._emit("fade",o._id))},C)},_stopFade:function(o){var c=this,d=c._soundById(o);return d&&d._interval&&(c._webAudio&&d._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(d._interval),d._interval=null,c.volume(d._fadeTo,o),d._fadeTo=null,c._emit("fade",o)),c},loop:function(){var o=this,c=arguments,d,m,g;if(c.length===0)return o._loop;if(c.length===1)if(typeof c[0]=="boolean")d=c[0],o._loop=d;else return g=o._soundById(parseInt(c[0],10)),g?g._loop:!1;else c.length===2&&(d=c[0],m=parseInt(c[1],10));for(var _=o._getSoundIds(m),p=0;p<_.length;p++)g=o._soundById(_[p]),g&&(g._loop=d,o._webAudio&&g._node&&g._node.bufferSource&&(g._node.bufferSource.loop=d,d&&(g._node.bufferSource.loopStart=g._start||0,g._node.bufferSource.loopEnd=g._stop,o.playing(_[p])&&(o.pause(_[p],!0),o.play(_[p],!0)))));return o},rate:function(){var o=this,c=arguments,d,m;if(c.length===0)m=o._sounds[0]._id;else if(c.length===1){var g=o._getSoundIds(),_=g.indexOf(c[0]);_>=0?m=parseInt(c[0],10):d=parseFloat(c[0])}else c.length===2&&(d=parseFloat(c[0]),m=parseInt(c[1],10));var p;if(typeof d=="number"){if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,c)}}),o;typeof m>"u"&&(o._rate=d),m=o._getSoundIds(m);for(var v=0;v<m.length;v++)if(p=o._soundById(m[v]),p){o.playing(m[v])&&(p._rateSeek=o.seek(m[v]),p._playStart=o._webAudio?t.ctx.currentTime:p._playStart),p._rate=d,o._webAudio&&p._node&&p._node.bufferSource?p._node.bufferSource.playbackRate.setValueAtTime(d,t.ctx.currentTime):p._node&&(p._node.playbackRate=d);var x=o.seek(m[v]),S=(o._sprite[p._sprite][0]+o._sprite[p._sprite][1])/1e3-x,C=S*1e3/Math.abs(p._rate);(o._endTimers[m[v]]||!p._paused)&&(o._clearTimer(m[v]),o._endTimers[m[v]]=setTimeout(o._ended.bind(o,p),C)),o._emit("rate",p._id)}}else return p=o._soundById(m),p?p._rate:o._rate;return o},seek:function(){var o=this,c=arguments,d,m;if(c.length===0)o._sounds.length&&(m=o._sounds[0]._id);else if(c.length===1){var g=o._getSoundIds(),_=g.indexOf(c[0]);_>=0?m=parseInt(c[0],10):o._sounds.length&&(m=o._sounds[0]._id,d=parseFloat(c[0]))}else c.length===2&&(d=parseFloat(c[0]),m=parseInt(c[1],10));if(typeof m>"u")return 0;if(typeof d=="number"&&(o._state!=="loaded"||o._playLock))return o._queue.push({event:"seek",action:function(){o.seek.apply(o,c)}}),o;var p=o._soundById(m);if(p)if(typeof d=="number"&&d>=0){var v=o.playing(m);v&&o.pause(m,!0),p._seek=d,p._ended=!1,o._clearTimer(m),!o._webAudio&&p._node&&!isNaN(p._node.duration)&&(p._node.currentTime=d);var x=function(){v&&o.play(m,!0),o._emit("seek",m)};if(v&&!o._webAudio){var S=function(){o._playLock?setTimeout(S,0):x()};setTimeout(S,0)}else x()}else if(o._webAudio){var C=o.playing(m)?t.ctx.currentTime-p._playStart:0,w=p._rateSeek?p._rateSeek-p._seek:0;return p._seek+(w+C*Math.abs(p._rate))}else return p._node.currentTime;return o},playing:function(o){var c=this;if(typeof o=="number"){var d=c._soundById(o);return d?!d._paused:!1}for(var m=0;m<c._sounds.length;m++)if(!c._sounds[m]._paused)return!0;return!1},duration:function(o){var c=this,d=c._duration,m=c._soundById(o);return m&&(d=c._sprite[m._sprite][1]/1e3),d},state:function(){return this._state},unload:function(){for(var o=this,c=o._sounds,d=0;d<c.length;d++)c[d]._paused||o.stop(c[d]._id),o._webAudio||(o._clearSound(c[d]._node),c[d]._node.removeEventListener("error",c[d]._errorFn,!1),c[d]._node.removeEventListener(t._canPlayEvent,c[d]._loadFn,!1),c[d]._node.removeEventListener("ended",c[d]._endFn,!1),t._releaseHtml5Audio(c[d]._node)),delete c[d]._node,o._clearTimer(c[d]._id);var m=t._howls.indexOf(o);m>=0&&t._howls.splice(m,1);var g=!0;for(d=0;d<t._howls.length;d++)if(t._howls[d]._src===o._src||o._src.indexOf(t._howls[d]._src)>=0){g=!1;break}return s&&g&&delete s[o._src],t.noAudio=!1,o._state="unloaded",o._sounds=[],o=null,null},on:function(o,c,d,m){var g=this,_=g["_on"+o];return typeof c=="function"&&_.push(m?{id:d,fn:c,once:m}:{id:d,fn:c}),g},off:function(o,c,d){var m=this,g=m["_on"+o],_=0;if(typeof c=="number"&&(d=c,c=null),c||d)for(_=0;_<g.length;_++){var p=d===g[_].id;if(c===g[_].fn&&p||!c&&p){g.splice(_,1);break}}else if(o)m["_on"+o]=[];else{var v=Object.keys(m);for(_=0;_<v.length;_++)v[_].indexOf("_on")===0&&Array.isArray(m[v[_]])&&(m[v[_]]=[])}return m},once:function(o,c,d){var m=this;return m.on(o,c,d,1),m},_emit:function(o,c,d){for(var m=this,g=m["_on"+o],_=g.length-1;_>=0;_--)(!g[_].id||g[_].id===c||o==="load")&&(setTimeout((function(p){p.call(this,c,d)}).bind(m,g[_].fn),0),g[_].once&&m.off(o,g[_].fn,g[_].id));return m._loadQueue(o),m},_loadQueue:function(o){var c=this;if(c._queue.length>0){var d=c._queue[0];d.event===o&&(c._queue.shift(),c._loadQueue()),o||d.action()}return c},_ended:function(o){var c=this,d=o._sprite;if(!c._webAudio&&o._node&&!o._node.paused&&!o._node.ended&&o._node.currentTime<o._stop)return setTimeout(c._ended.bind(c,o),100),c;var m=!!(o._loop||c._sprite[d][2]);if(c._emit("end",o._id),!c._webAudio&&m&&c.stop(o._id,!0).play(o._id),c._webAudio&&m){c._emit("play",o._id),o._seek=o._start||0,o._rateSeek=0,o._playStart=t.ctx.currentTime;var g=(o._stop-o._start)*1e3/Math.abs(o._rate);c._endTimers[o._id]=setTimeout(c._ended.bind(c,o),g)}return c._webAudio&&!m&&(o._paused=!0,o._ended=!0,o._seek=o._start||0,o._rateSeek=0,c._clearTimer(o._id),c._cleanBuffer(o._node),t._autoSuspend()),!c._webAudio&&!m&&c.stop(o._id,!0),c},_clearTimer:function(o){var c=this;if(c._endTimers[o]){if(typeof c._endTimers[o]!="function")clearTimeout(c._endTimers[o]);else{var d=c._soundById(o);d&&d._node&&d._node.removeEventListener("ended",c._endTimers[o],!1)}delete c._endTimers[o]}return c},_soundById:function(o){for(var c=this,d=0;d<c._sounds.length;d++)if(o===c._sounds[d]._id)return c._sounds[d];return null},_inactiveSound:function(){var o=this;o._drain();for(var c=0;c<o._sounds.length;c++)if(o._sounds[c]._ended)return o._sounds[c].reset();return new i(o)},_drain:function(){var o=this,c=o._pool,d=0,m=0;if(!(o._sounds.length<c)){for(m=0;m<o._sounds.length;m++)o._sounds[m]._ended&&d++;for(m=o._sounds.length-1;m>=0;m--){if(d<=c)return;o._sounds[m]._ended&&(o._webAudio&&o._sounds[m]._node&&o._sounds[m]._node.disconnect(0),o._sounds.splice(m,1),d--)}}},_getSoundIds:function(o){var c=this;if(typeof o>"u"){for(var d=[],m=0;m<c._sounds.length;m++)d.push(c._sounds[m]._id);return d}else return[o]},_refreshBuffer:function(o){var c=this;return o._node.bufferSource=t.ctx.createBufferSource(),o._node.bufferSource.buffer=s[c._src],o._panner?o._node.bufferSource.connect(o._panner):o._node.bufferSource.connect(o._node),o._node.bufferSource.loop=o._loop,o._loop&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop||0),o._node.bufferSource.playbackRate.setValueAtTime(o._rate,t.ctx.currentTime),c},_cleanBuffer:function(o){var c=this,d=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(!o.bufferSource)return c;if(t._scratchBuffer&&o.bufferSource&&(o.bufferSource.onended=null,o.bufferSource.disconnect(0),d))try{o.bufferSource.buffer=t._scratchBuffer}catch{}return o.bufferSource=null,c},_clearSound:function(o){var c=/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent);c||(o.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(o){this._parent=o,this.init()};i.prototype={init:function(){var o=this,c=o._parent;return o._muted=c._muted,o._loop=c._loop,o._volume=c._volume,o._rate=c._rate,o._seek=0,o._paused=!0,o._ended=!0,o._sprite="__default",o._id=++t._counter,c._sounds.push(o),o.create(),o},create:function(){var o=this,c=o._parent,d=t._muted||o._muted||o._parent._muted?0:o._volume;return c._webAudio?(o._node=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),o._node.gain.setValueAtTime(d,t.ctx.currentTime),o._node.paused=!0,o._node.connect(t.masterGain)):t.noAudio||(o._node=t._obtainHtml5Audio(),o._errorFn=o._errorListener.bind(o),o._node.addEventListener("error",o._errorFn,!1),o._loadFn=o._loadListener.bind(o),o._node.addEventListener(t._canPlayEvent,o._loadFn,!1),o._endFn=o._endListener.bind(o),o._node.addEventListener("ended",o._endFn,!1),o._node.src=c._src,o._node.preload=c._preload===!0?"auto":c._preload,o._node.volume=d*t.volume(),o._node.load()),o},reset:function(){var o=this,c=o._parent;return o._muted=c._muted,o._loop=c._loop,o._volume=c._volume,o._rate=c._rate,o._seek=0,o._rateSeek=0,o._paused=!0,o._ended=!0,o._sprite="__default",o._id=++t._counter,o},_errorListener:function(){var o=this;o._parent._emit("loaderror",o._id,o._node.error?o._node.error.code:0),o._node.removeEventListener("error",o._errorFn,!1)},_loadListener:function(){var o=this,c=o._parent;c._duration=Math.ceil(o._node.duration*10)/10,Object.keys(c._sprite).length===0&&(c._sprite={__default:[0,c._duration*1e3]}),c._state!=="loaded"&&(c._state="loaded",c._emit("load"),c._loadQueue()),o._node.removeEventListener(t._canPlayEvent,o._loadFn,!1)},_endListener:function(){var o=this,c=o._parent;c._duration===1/0&&(c._duration=Math.ceil(o._node.duration*10)/10,c._sprite.__default[1]===1/0&&(c._sprite.__default[1]=c._duration*1e3),c._ended(o)),o._node.removeEventListener("ended",o._endFn,!1)}};var s={},a=function(o){var c=o._src;if(s[c]){o._duration=s[c].duration,u(o);return}if(/^data:[^;]+;base64,/.test(c)){for(var d=atob(c.split(",")[1]),m=new Uint8Array(d.length),g=0;g<d.length;++g)m[g]=d.charCodeAt(g);h(m.buffer,o)}else{var _=new XMLHttpRequest;_.open(o._xhr.method,c,!0),_.withCredentials=o._xhr.withCredentials,_.responseType="arraybuffer",o._xhr.headers&&Object.keys(o._xhr.headers).forEach(function(p){_.setRequestHeader(p,o._xhr.headers[p])}),_.onload=function(){var p=(_.status+"")[0];if(p!=="0"&&p!=="2"&&p!=="3"){o._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");return}h(_.response,o)},_.onerror=function(){o._webAudio&&(o._html5=!0,o._webAudio=!1,o._sounds=[],delete s[c],o.load())},l(_)}},l=function(o){try{o.send()}catch{o.onerror()}},h=function(o,c){var d=function(){c._emit("loaderror",null,"Decoding audio data failed.")},m=function(g){g&&c._sounds.length>0?(s[c._src]=g,u(c,g)):d()};typeof Promise<"u"&&t.ctx.decodeAudioData.length===1?t.ctx.decodeAudioData(o).then(m).catch(d):t.ctx.decodeAudioData(o,m,d)},u=function(o,c){c&&!o._duration&&(o._duration=c.duration),Object.keys(o._sprite).length===0&&(o._sprite={__default:[0,o._duration*1e3]}),o._state!=="loaded"&&(o._state="loaded",o._emit("load"),o._loadQueue())},f=function(){if(t.usingWebAudio){try{typeof AudioContext<"u"?t.ctx=new AudioContext:typeof webkitAudioContext<"u"?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch{t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var o=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),c=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),d=c?parseInt(c[1],10):null;if(o&&d&&d<9){var m=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!m&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};r.Howler=t,r.Howl=n,typeof is<"u"?(is.HowlerGlobal=e,is.Howler=t,is.Howl=n,is.Sound=i):typeof window<"u"&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=n,window.Sound=i)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(t){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(t);return n},HowlerGlobal.prototype.pos=function(t,n,i){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(n=typeof n!="number"?s._pos[1]:n,i=typeof i!="number"?s._pos[2]:i,typeof t=="number")s._pos=[t,n,i],typeof s.ctx.listener.positionX<"u"?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]);else return s._pos;return s},HowlerGlobal.prototype.orientation=function(t,n,i,s,a,l){var h=this;if(!h.ctx||!h.ctx.listener)return h;var u=h._orientation;if(n=typeof n!="number"?u[1]:n,i=typeof i!="number"?u[2]:i,s=typeof s!="number"?u[3]:s,a=typeof a!="number"?u[4]:a,l=typeof l!="number"?u[5]:l,typeof t=="number")h._orientation=[t,n,i,s,a,l],typeof h.ctx.listener.forwardX<"u"?(h.ctx.listener.forwardX.setTargetAtTime(t,Howler.ctx.currentTime,.1),h.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),h.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),h.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),h.ctx.listener.upY.setTargetAtTime(a,Howler.ctx.currentTime,.1),h.ctx.listener.upZ.setTargetAtTime(l,Howler.ctx.currentTime,.1)):h.ctx.listener.setOrientation(t,n,i,s,a,l);else return u;return h},Howl.prototype.init=function(t){return function(n){var i=this;return i._orientation=n.orientation||[1,0,0],i._stereo=n.stereo||null,i._pos=n.pos||null,i._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle<"u"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle<"u"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain<"u"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel<"u"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance<"u"?n.maxDistance:1e4,panningModel:typeof n.panningModel<"u"?n.panningModel:"HRTF",refDistance:typeof n.refDistance<"u"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor<"u"?n.rolloffFactor:1},i._onstereo=n.onstereo?[{fn:n.onstereo}]:[],i._onpos=n.onpos?[{fn:n.onpos}]:[],i._onorientation=n.onorientation?[{fn:n.onorientation}]:[],t.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(t,n){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(t,n)}}),i;var s=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof n>"u")if(typeof t=="number")i._stereo=t,i._pos=[t,0,0];else return i._stereo;for(var a=i._getSoundIds(n),l=0;l<a.length;l++){var h=i._soundById(a[l]);if(h)if(typeof t=="number")h._stereo=t,h._pos=[t,0,0],h._node&&(h._pannerAttr.panningModel="equalpower",(!h._panner||!h._panner.pan)&&e(h,s),s==="spatial"?typeof h._panner.positionX<"u"?(h._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):h._panner.setPosition(t,0,0):h._panner.pan.setValueAtTime(t,Howler.ctx.currentTime)),i._emit("stereo",h._id);else return h._stereo}return i},Howl.prototype.pos=function(t,n,i,s){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"pos",action:function(){a.pos(t,n,i,s)}}),a;if(n=typeof n!="number"?0:n,i=typeof i!="number"?-.5:i,typeof s>"u")if(typeof t=="number")a._pos=[t,n,i];else return a._pos;for(var l=a._getSoundIds(s),h=0;h<l.length;h++){var u=a._soundById(l[h]);if(u)if(typeof t=="number")u._pos=[t,n,i],u._node&&((!u._panner||u._panner.pan)&&e(u,"spatial"),typeof u._panner.positionX<"u"?(u._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setPosition(t,n,i)),a._emit("pos",u._id);else return u._pos}return a},Howl.prototype.orientation=function(t,n,i,s){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"orientation",action:function(){a.orientation(t,n,i,s)}}),a;if(n=typeof n!="number"?a._orientation[1]:n,i=typeof i!="number"?a._orientation[2]:i,typeof s>"u")if(typeof t=="number")a._orientation=[t,n,i];else return a._orientation;for(var l=a._getSoundIds(s),h=0;h<l.length;h++){var u=a._soundById(l[h]);if(u)if(typeof t=="number")u._orientation=[t,n,i],u._node&&(u._panner||(u._pos||(u._pos=a._pos||[0,0,-.5]),e(u,"spatial")),typeof u._panner.orientationX<"u"?(u._panner.orientationX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setOrientation(t,n,i)),a._emit("orientation",u._id);else return u._orientation}return a},Howl.prototype.pannerAttr=function(){var t=this,n=arguments,i,s,a;if(!t._webAudio)return t;if(n.length===0)return t._pannerAttr;if(n.length===1)if(typeof n[0]=="object")i=n[0],typeof s>"u"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),t._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle<"u"?i.pannerAttr.coneInnerAngle:t._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle<"u"?i.pannerAttr.coneOuterAngle:t._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain<"u"?i.pannerAttr.coneOuterGain:t._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel<"u"?i.pannerAttr.distanceModel:t._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance<"u"?i.pannerAttr.maxDistance:t._maxDistance,refDistance:typeof i.pannerAttr.refDistance<"u"?i.pannerAttr.refDistance:t._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor<"u"?i.pannerAttr.rolloffFactor:t._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel<"u"?i.pannerAttr.panningModel:t._panningModel});else return a=t._soundById(parseInt(n[0],10)),a?a._pannerAttr:t._pannerAttr;else n.length===2&&(i=n[0],s=parseInt(n[1],10));for(var l=t._getSoundIds(s),h=0;h<l.length;h++)if(a=t._soundById(l[h]),a){var u=a._pannerAttr;u={coneInnerAngle:typeof i.coneInnerAngle<"u"?i.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle<"u"?i.coneOuterAngle:u.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain<"u"?i.coneOuterGain:u.coneOuterGain,distanceModel:typeof i.distanceModel<"u"?i.distanceModel:u.distanceModel,maxDistance:typeof i.maxDistance<"u"?i.maxDistance:u.maxDistance,refDistance:typeof i.refDistance<"u"?i.refDistance:u.refDistance,rolloffFactor:typeof i.rolloffFactor<"u"?i.rolloffFactor:u.rolloffFactor,panningModel:typeof i.panningModel<"u"?i.panningModel:u.panningModel};var f=a._panner;f||(a._pos||(a._pos=t._pos||[0,0,-.5]),e(a,"spatial"),f=a._panner),f.coneInnerAngle=u.coneInnerAngle,f.coneOuterAngle=u.coneOuterAngle,f.coneOuterGain=u.coneOuterGain,f.distanceModel=u.distanceModel,f.maxDistance=u.maxDistance,f.refDistance=u.refDistance,f.rolloffFactor=u.rolloffFactor,f.panningModel=u.panningModel}return t},Sound.prototype.init=function(t){return function(){var n=this,i=n._parent;n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,t.call(this),n._stereo?i.stereo(n._stereo):n._pos&&i.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(t){return function(){var n=this,i=n._parent;return n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,n._stereo?i.stereo(n._stereo):n._pos?i.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,i._refreshBuffer(n)),t.call(this)}}(Sound.prototype.reset);var e=function(t,n){n=n||"spatial",n==="spatial"?(t._panner=Howler.ctx.createPanner(),t._panner.coneInnerAngle=t._pannerAttr.coneInnerAngle,t._panner.coneOuterAngle=t._pannerAttr.coneOuterAngle,t._panner.coneOuterGain=t._pannerAttr.coneOuterGain,t._panner.distanceModel=t._pannerAttr.distanceModel,t._panner.maxDistance=t._pannerAttr.maxDistance,t._panner.refDistance=t._pannerAttr.refDistance,t._panner.rolloffFactor=t._pannerAttr.rolloffFactor,t._panner.panningModel=t._pannerAttr.panningModel,typeof t._panner.positionX<"u"?(t._panner.positionX.setValueAtTime(t._pos[0],Howler.ctx.currentTime),t._panner.positionY.setValueAtTime(t._pos[1],Howler.ctx.currentTime),t._panner.positionZ.setValueAtTime(t._pos[2],Howler.ctx.currentTime)):t._panner.setPosition(t._pos[0],t._pos[1],t._pos[2]),typeof t._panner.orientationX<"u"?(t._panner.orientationX.setValueAtTime(t._orientation[0],Howler.ctx.currentTime),t._panner.orientationY.setValueAtTime(t._orientation[1],Howler.ctx.currentTime),t._panner.orientationZ.setValueAtTime(t._orientation[2],Howler.ctx.currentTime)):t._panner.setOrientation(t._orientation[0],t._orientation[1],t._orientation[2])):(t._panner=Howler.ctx.createStereoPanner(),t._panner.pan.setValueAtTime(t._stereo,Howler.ctx.currentTime)),t._panner.connect(t._node),t._paused||t._parent.pause(t._id,!0).play(t._id,!0)}})()})(Mo);class av{constructor(){this.sounds={},this._bgmStarted=!1,this._unlocked=!1,this._loadSound("break","/sounds/break.mp3",{volume:.5}),this._loadSound("bounce","/sounds/bounce.mp3",{volume:.45}),this._loadSound("death","/sounds/death.mp3",{volume:.65}),this._loadSound("win","/sounds/win.mp3",{volume:.55}),this._loadSound("bgm","/sounds/bgm.mp3",{loop:!0,volume:.25}),this._unlockAudio=this._unlockAudio.bind(this),window.addEventListener("touchstart",this._unlockAudio,{once:!0,passive:!0}),window.addEventListener("pointerdown",this._unlockAudio,{once:!0,passive:!0})}_loadSound(e,t,n={}){try{const i=new Mo.Howl({src:[t],preload:!0,onloaderror:()=>{this.sounds[e]=null},onplayerror:()=>{this.sounds[e]=null},...n});this.sounds[e]=i}catch{this.sounds[e]=null}}_unlockAudio(){if(this._unlocked)return;this._unlocked=!0,Mo.Howler.autoUnlock=!0;const e=this.sounds.break;if(e){const t=e.play();e.volume(0,t),e.once("play",()=>{e.stop(t),e.volume(.5,t)})}}play(e){const t=this.sounds[e];t&&t.play()}startBGM(){if(this._bgmStarted)return;const e=this.sounds.bgm;e&&(this._bgmStarted=!0,e.play())}stopBGM(){const e=this.sounds.bgm;e&&(e.stop(),this._bgmStarted=!1)}}console.log("%c✨ STACK BALL PRO v4.2 - VICTORY SEQUENCE FIX ✨","color: #FF6B9D; font-weight: bold; font-size: 20px; text-shadow: 0 2px 8px rgba(255,107,157,0.5);");console.log("%c🎯 Fixed: Victory sequence hanging after level 3","color: #4CAF50; font-weight: bold;");console.log("%c🎨 Soft Sunset Theme - Easy on Eyes","color: #FEC260; font-weight: bold;");console.log("%c💎 Glass Morphism UI - Modern Design","color: #FF8DB3;");function lv(){const r=globalThis==null?void 0:globalThis.performance;if(!r)return;const e=()=>{},t=["mark","measure","clearMarks","clearMeasures"];for(const i of t)if(typeof r[i]!="function")try{Object.defineProperty(r,i,{value:e,writable:!0,configurable:!0})}catch{try{r[i]=e}catch{}}const n=globalThis==null?void 0:globalThis.ugt;if(n&&typeof n=="object"&&typeof n.clearMarks!="function")try{n.clearMarks=e}catch{}}async function cv(){lv();const r=document.getElementById("app"),e=document.getElementById("ui"),t=new p_(r),n=new G0,i=new k0(t.renderer.domElement),s=new av,a=new rv(t.scene3D),l=new sv(t.scene3D,n),h=new iv(t.scene3D,n.world,n),u=new Z0(t.scene3D,n,1),f=new ov(e);h.particleSystem=a,h.buildLevel(cr(1));const o=new fs(u,h,l,f,s,a);window.__gm=o,u.setBreakInputSource(()=>o.state===Xt.PLAYING&&i.isPressing),o.renderer=t,t.setupCamera(u.mesh),window.addEventListener("game:restart",()=>o.restart()),window.addEventListener("game:next",()=>o.nextLevel()),f.showStartScreen();const c=[t.renderer.domElement,window],d=["pointerup","mouseup","touchend"],m=()=>{var p;if(o.state===Xt.IDLE){o.start(),(p=i.cancelPress)==null||p.call(i),s.startBGM();for(const v of c)for(const x of d)v.removeEventListener(x,m)}};for(const p of c)for(const v of d)p.addEventListener(v,m);const g=new f_;function _(){var v;requestAnimationFrame(_);const p=Math.min(g.getDelta(),.05);i.update(),(v=f.setBreakMode)==null||v.call(f,o.state===Xt.PLAYING&&i.isPressing),o.state===Xt.PLAYING?(n.step(p),u.update(p),h.update(p,i.rotation)):o.state===Xt.WIN&&h.update(p,0),a.update(p),t.updateCamera(p),t.render()}_()}cv().catch(console.error);
