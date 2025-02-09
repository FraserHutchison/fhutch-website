---
title: markdown-helper
categories:
tags:
featured_image:
---

# Images
{% asset_img img-center logo.png 500 %}
{% asset_img img-center picture.jpg 500 %}
{% asset_img img-center proc-example.gif 500 %}

# YouTube Videos
{% youtube lJIrF4YjHfQ %}

# Shaders
<canvas id="shaderCanvas" width="500" height="500"></canvas>

# ShaderToy
<iframe src="https://www.shadertoy.com/embed/MlyGzW?gui=true&t=10&paused=false&muted=false" width="800" height="450"></iframe>

# Custom Markdown
## Rainbow Text
This is a <span class="rainbow-text">colorful</span> sentence. Hey <span class="rainbow-text">Joel</span>.

## Changing Colors
<span class="color-change">Changing Colors</span>

## Wave Text
<span class="wave">
  <span>W</span><span>a</span><span>v</span><span>e</span>
</span>

## Pulsing Text
<span class="pulse">Pulsing Text</span>

## Rainbow Hover
<span class="rainbow-hover">Hover Over Me!</span>

## Earthquake
<span class="earthquake">EARTHQUAKE!</span>

## Comic Pop
<span class="comic-pop">BOOM!</span>

# Line Breaks
<br><br><hr><br><br>

# Code Blocks
{% codeblock lang:c %}
_ChannelMixer_Red = float3 (OutRedInRed, OutRedInGreen, OutRedInBlue);
_ChannelMixer_Green = float3 (OutGreenInRed, OutGreenInGreen, OutGreenInBlue);
_ChannelMixer_Blue = float3 (OutBlueInRed, OutBlueInGreen, OutBlueInBlue)
    
void Unity_ChannelMixer_float(float3 In, float3 _ChannelMixer_Red, float3 _ChannelMixer_Green, float3 _ChannelMixer_Blue, out float3 Out)
{
    Out = float3(dot(In, _ChannelMixer_Red), dot(In, _ChannelMixer_Green), dot(In, _ChannelMixer_Blue));
}
{% endcodeblock %}

