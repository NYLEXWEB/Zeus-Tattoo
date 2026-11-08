// WebGL Shaders for GPGPU Fluid Ink Cursor Trail with Chromatic Dispersion & Film Grain

export const vsSource = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fsUpdate = `
precision highp float;
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform vec2 u_prevMouse;
uniform vec2 u_resolution;
uniform float u_dt;
uniform float u_time;
uniform int u_isMoved;
varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D Value Noise for organic fluid eddies
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Distance from pixel to line segment drawn between mouse positions
float distToSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    return length(pa - ba * h);
}

void main() {
    // 1. Organic turbulence displacement
    vec2 distort = vec2(
        noise(vUv * 8.0 + u_time * 0.5) - 0.5, 
        noise(vUv * 12.0 - u_time * 0.4) - 0.5
    );
    
    // 2. RGB Prism diffusion: channel offsets for fluid dispersion
    float r = texture2D(u_texture, vUv + distort * 0.002).r;
    float g = texture2D(u_texture, vUv + distort * 0.0035).g;
    float b = texture2D(u_texture, vUv + distort * 0.005).b;
    float a = texture2D(u_texture, vUv + distort * 0.003).a;
    
    vec3 color = vec3(r, g, b);
    
    // 3. Fluid decay (gradually fades out smoothly)
    float fadeRate = 0.55; 
    float density = max(0.0, a - u_dt * fadeRate);
    
    // 4. Inject new ink on mouse movement
    if (u_isMoved == 1) {
        float d = distToSegment(gl_FragCoord.xy, u_prevMouse, u_mouse);
        
        float n = noise(gl_FragCoord.xy * 0.04 + u_time * 0.8);
        float radius = 42.0 + n * 32.0;
        float intensity = smoothstep(radius, radius - 4.0, d);
        
        // Zeus Studio Signature Color Palette:
        // Molten Amber Gold (#ffa852), Peach Glow (#ffc285), and Electric Spark (#4ca3ff)
        vec3 gold = vec3(1.0, 0.66, 0.32);
        vec3 peach = vec3(1.0, 0.76, 0.52);
        vec3 spark = vec3(0.35, 0.68, 1.0);
        
        float pulse = sin(u_time * 2.0 + gl_FragCoord.x * 0.004) * 0.5 + 0.5;
        vec3 spectrum = mix(gold, peach, pulse);
        spectrum = mix(spectrum, spark, 0.12 * sin(u_time * 3.0 + gl_FragCoord.y * 0.005));
        
        float colorBlend = smoothstep(0.0, 1.0, intensity);
        color = mix(color, spectrum, colorBlend);
        density = max(density, intensity * 0.85);
    }
    
    gl_FragColor = vec4(color, density);
}
`;

export const fsRender = `
precision highp float;
uniform sampler2D u_texture;
varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float dist = length(p);
    float n = hash(gl_FragCoord.xy);
    
    // Optical lens aberration expanding towards boundaries
    vec2 dispersion = vec2(0.002, 0.0015) * (n - 0.5) * (1.0 + dist * 3.0);
    
    float r = texture2D(u_texture, vUv + dispersion * 1.0).r;
    float g = texture2D(u_texture, vUv + dispersion * 1.5).g;
    float b = texture2D(u_texture, vUv - dispersion * 1.5).b;
    float a = texture2D(u_texture, vUv).a;
    
    vec3 color = vec3(r, g, b);
    
    // Add fine film grain for vintage studio feel
    float grain = pow(n, 2.5);
    color += grain * (0.08 + dist * 0.15);
    
    // Soft vignette edge falloff
    float vignette = smoothstep(2.2, 0.6, dist);
    a *= vignette;
    color *= vignette * 1.35;
    
    gl_FragColor = vec4(color, a);
}
`;

