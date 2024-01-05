#version 460 core

#include <flutter/runtime_effect.glsl>

//increase float precision
precision highp float;

uniform vec2 uSize;

out vec4 fragColor;

void main(){
    fragColor = vec4(vec3(0), 1.0);

    vec2 pixel = gl_FragCoord.xy / uSize;
    vec2 center = vec2(0.5, 0.5);

    float radius = 0.5;

    float dist = distance(pixel, center);

    if(dist < radius){
        float distFromXoriginToEdge = (pixel.x - center.x)/radius;
        float distFromYoriginToEdge = (pixel.y - center.y)/radius;
        float estimatedZ = sqrt( pow(radius,2) - pow(distFromYoriginToEdge/2, 2) - pow(distFromXoriginToEdge/2, 2) );

        fragColor = vec4(vec3((estimatedZ/radius)), 1.0);
        //fragColor = vec4(vec3(abs(distFromXoriginToEdge)), 1.0);
        //fragColor = vec4(vec3(abs(distFromYoriginToEdge)), 1.0);
        //fragColor=vec4(1.);

        vec3 pointOnSphere = vec3(distFromXoriginToEdge/radius,distFromYoriginToEdge/radius, estimatedZ/radius);

        vec3 normal = normalize(pointOnSphere);

        vec3 norm_color = normal * 0.5 + 0.5;

        //plot the normals
        fragColor = vec4(norm_color, 1.0);

        //todo: begin the lighting calculations

            //todo: define light objects
       vec3 objectColor = vec3(0, 0.6, 0.7);
        vec3 lightPos = vec3(0.2, 0.3, 1.);
        vec3 lightColor = vec3(1.0);   //white
        float specularStrength = 0.4;
        float diffuseStrength = 1;


        vec3 allLight = vec3(0.0, 0.0, 0.0);

            //todo: normilezed vectors
        lightPos.y = -lightPos.y;
        vec3 L = normalize(lightPos);
        vec3 N = normalize(normal);
        vec3 R = -reflect(L, N);
        vec3 V = normalize(vec3(0.0, 0.0, 1.0));


            //todo: calculate ambient light
        float ambientStrength = 0.2;
        vec3 ambient = ambientStrength * objectColor;

        allLight += ambient;

            //todo: calculate diffuse
        float diff = max(dot(N, L), 0.0);
        vec3 diffuseColor = diff * lightColor * objectColor * diffuseStrength;
        allLight += diffuseColor;


            //todo: calculate specular highlights
        float spec = pow(max(dot(R, V), 0.0), 32);
        vec3 specularColor = specularStrength * spec * lightColor;
        allLight += specularColor;


        fragColor = vec4(allLight, 1.0);

    }




}