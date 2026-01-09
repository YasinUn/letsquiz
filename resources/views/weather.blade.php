<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App — Portfolio</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/weather.jsx'])
    <style>
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(10px, -15px); }
            50% { transform: translate(-10px, 10px); }
            75% { transform: translate(15px, 15px); }
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    </style>
</head>
<body>
    <!-- Back button -->
    <div class="fixed top-6 left-6 z-50">
        <a href="{{ route('portfolio') }}"
           class="group inline-flex items-center gap-2 px-5 py-3 bg-white/90 hover:bg-white border-2 border-blue-200 hover:border-blue-400 rounded-full backdrop-blur-lg transition-all duration-300 text-gray-700 hover:text-gray-900 shadow-xl">
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="font-bold">Portfolio</span>
        </a>
    </div>

    <div id="weather-app"></div>
</body>
</html>
