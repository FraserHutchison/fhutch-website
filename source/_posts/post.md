---
title: Unity URP Shaders
date: 2025-02-08 11:54:46
tags: [Shaders, URP, Unity]
categories:
- [gallery]
featured_image: /2025/02/08/post/logo.png
---
<canvas id="shaderCanvas" width="500" height="500"></canvas>
<script src="/js/circle-shader.js"></script>

This is a <span class="rainbow-text">colorful</span> sentence. Hey <span class="rainbow-text">Joel</span>. 

<span class="color-change">Changing Colors</span>

<span class="wave">
  <span>W</span><span>a</span><span>v</span><span>e</span>
</span>

<span class="pulse">Pulsing Text</span>

<span class="rainbow-hover">Hover Over Me!</span>

<span class="earthquake">EARTHQUAKE!</span>

<span class="comic-pop">BOOM!</span>

[//]: # (<iframe src="https://www.shadertoy.com/embed/MlyGzW?gui=true&t=10&paused=false&muted=false" width="800" height="450"></iframe>)



<br><br><hr><br><br>

{% asset_img img-center logo.png 500 %}

<br><br><hr><br><br>

[//]: # ({% youtube lJIrF4YjHfQ %})

<br><br><hr><br><br>

{% codeblock lang:c %}
_ChannelMixer_Red = float3 (OutRedInRed, OutRedInGreen, OutRedInBlue);
_ChannelMixer_Green = float3 (OutGreenInRed, OutGreenInGreen, OutGreenInBlue);
_ChannelMixer_Blue = float3 (OutBlueInRed, OutBlueInGreen, OutBlueInBlue)

void Unity_ChannelMixer_float(float3 In, float3 _ChannelMixer_Red, float3 _ChannelMixer_Green, float3 _ChannelMixer_Blue, out float3 Out)
{
    Out = float3(dot(In, _ChannelMixer_Red), dot(In, _ChannelMixer_Green), dot(In, _ChannelMixer_Blue));
}
{% endcodeblock %}

<br><br><hr><br><br>

