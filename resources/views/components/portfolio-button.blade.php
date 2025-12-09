@props(['href', 'external' => false, 'color' => 'green', 'description' => '', 'password' => '', 'madeFor' => ''])

@php
    $gradients = [
        'green' => 'from-green-500 via-teal-500 to-blue-500',
        'purple' => 'from-purple-600 via-pink-500 to-red-500',
        'blue' => 'from-blue-600 via-cyan-500 to-indigo-500',
        'orange' => 'from-orange-500 via-red-500 to-pink-600',
    ];
    $gradient = $gradients[$color] ?? $gradients['green'];
@endphp

@if($external)
    <a href="{{ $href }}" target="_blank" rel="noopener noreferrer"
       {{ $attributes->merge(['class' => 'group relative inline-flex flex-col items-center justify-center w-full md:w-auto px-10 py-5 overflow-hidden font-bold text-white rounded-xl shadow-2xl transition-all duration-300 ease-out hover:scale-105']) }}>
        <span class="absolute inset-0 w-full h-full bg-gradient-to-br {{ $gradient }}"></span>
        <span class="absolute inset-0 w-full h-full bg-gradient-to-br {{ $gradient }} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
        <span class="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20 group-hover:h-full transition-all duration-500 ease-out"></span>
        <span class="relative text-lg uppercase tracking-wider">{{ $slot }}</span>
        @if($description)
            <span class="relative text-xs mt-2 opacity-80 normal-case tracking-normal font-normal">{{ $description }}</span>
        @endif
        @if($madeFor)
            <span class="relative text-xs mt-1 opacity-70 bg-white/5 px-2 py-0.5 rounded normal-case tracking-normal font-normal italic">📚 {{ $madeFor }}</span>
        @endif
        @if($password)
            <span class="relative text-xs mt-1 opacity-90 bg-white/10 px-3 py-1 rounded-full normal-case tracking-normal font-semibold">🔑 Wachtwoord: {{ $password }}</span>
        @endif
    </a>
@else
    <a href="{{ $href }}"
       {{ $attributes->merge(['class' => 'group relative inline-flex flex-col items-center justify-center w-full md:w-auto px-10 py-5 overflow-hidden font-bold text-white rounded-xl shadow-2xl transition-all duration-300 ease-out hover:scale-105']) }}>
        <span class="absolute inset-0 w-full h-full bg-gradient-to-br {{ $gradient }}"></span>
        <span class="absolute inset-0 w-full h-full bg-gradient-to-br {{ $gradient }} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
        <span class="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20 group-hover:h-full transition-all duration-500 ease-out"></span>
        <span class="relative text-lg uppercase tracking-wider">{{ $slot }}</span>
        @if($description)
            <span class="relative text-xs mt-2 opacity-80 normal-case tracking-normal font-normal">{{ $description }}</span>
        @endif
        @if($madeFor)
            <span class="relative text-xs mt-1 opacity-70 bg-white/5 px-2 py-0.5 rounded normal-case tracking-normal font-normal italic">📚 {{ $madeFor }}</span>
        @endif
        @if($password)
            <span class="relative text-xs mt-1 opacity-90 bg-white/10 px-3 py-1 rounded-full normal-case tracking-normal font-semibold">🔑 Wachtwoord: {{ $password }}</span>
        @endif
    </a>
@endif
