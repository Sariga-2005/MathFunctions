import { useState } from 'react';

function CombinedLab1() {
    const [selectedOperation, setSelectedOperation] = useState('factorial');
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null);

    // Factorial Calculation
    const calculateFactorial = (n) => {
        if (n < 0) return 'Factorial is not defined for negative numbers';
        if (n === 0 || n === 1) return 1;
        let fact = 1;
        for (let i = 2; i <= n; i++) {
            fact *= i;
        }
        return fact;
    };

    // Fibonacci Series Generation
    const generateFibonacci = (n) => {
        if (n <= 0) return [];
        if (n === 1) return [0];
        if (n === 2) return [0, 1];

        const fib = [0, 1];
        for (let i = 2; i < n; i++) {
            fib.push(fib[i - 1] + fib[i - 2]);
        }
        return fib;
    };

    // Prime Number Check
    const checkPrime = (n) => {
        if (n <= 1) return { isPrime: false, message: `${n} is not a prime number` };
        if (n === 2) return { isPrime: true, message: `${n} is a prime number` };
        if (n % 2 === 0) return { isPrime: false, message: `${n} is not a prime number (divisible by 2)` };

        // Check for factors from 3 to sqrt(n)
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) {
                return { isPrime: false, message: `${n} is not a prime number (divisible by ${i})` };
            }
        }
        return { isPrime: true, message: `${n} is a prime number` };
    };

    const handleCalculate = () => {
        const num = parseInt(number);

        if (isNaN(num)) {
            setResult({ error: 'Please enter a valid number' });
            return;
        }

        switch (selectedOperation) {
            case 'factorial':
                setResult({ value: calculateFactorial(num), type: 'factorial' });
                break;
            case 'fibonacci':
                setResult({ value: generateFibonacci(num), type: 'fibonacci' });
                break;
            case 'prime':
                setResult({ value: checkPrime(num), type: 'prime' });
                break;
            default:
                setResult(null);
        }
    };

    const handleReset = () => {
        setNumber('');
        setResult(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-purple-800 mb-2">
                        🔢 Math Operations Lab
                    </h1>
                    <p className="text-gray-600 font-medium">
                        EX.NO.: 1 - Factorial, Fibonacci & Prime Number Calculator
                    </p>
                </div>

                {/* Operation Selector */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Select Operation
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => {
                                setSelectedOperation('factorial');
                                handleReset();
                            }}
                            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${selectedOperation === 'factorial'
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            📊 Factorial
                        </button>
                        <button
                            onClick={() => {
                                setSelectedOperation('fibonacci');
                                handleReset();
                            }}
                            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${selectedOperation === 'fibonacci'
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            🌀 Fibonacci
                        </button>
                        <button
                            onClick={() => {
                                setSelectedOperation('prime');
                                handleReset();
                            }}
                            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${selectedOperation === 'prime'
                                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            ✨ Prime Check
                        </button>
                    </div>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-6">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            {selectedOperation === 'factorial' && '📊 Enter number for Factorial:'}
                            {selectedOperation === 'fibonacci' && '🌀 Enter count for Fibonacci Series:'}
                            {selectedOperation === 'prime' && '✨ Enter number to check if Prime:'}
                        </label>
                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
                            className="w-full p-4 border-4 border-purple-300 rounded-xl text-2xl text-center font-bold focus:outline-none focus:border-purple-500 transition-all"
                            placeholder="Enter a number"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleCalculate}
                            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
                        >
                            Calculate 🚀
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
                        >
                            Reset 🔄
                        </button>
                    </div>

                    {/* Result Display */}
                    {result && (
                        <div className="mt-8">
                            {result.error ? (
                                <div className="bg-red-100 border-4 border-red-400 rounded-xl p-6 text-center">
                                    <p className="text-red-700 font-bold text-xl">{result.error}</p>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-4 border-purple-400 rounded-xl p-6">
                                    <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">
                                        📋 Result
                                    </h3>

                                    {result.type === 'factorial' && (
                                        <div className="text-center">
                                            <p className="text-gray-700 font-semibold mb-2">
                                                Factorial of {number} is:
                                            </p>
                                            <p className="text-5xl font-bold text-purple-600">
                                                {result.value}
                                            </p>
                                        </div>
                                    )}

                                    {result.type === 'fibonacci' && (
                                        <div>
                                            <p className="text-gray-700 font-semibold mb-3 text-center">
                                                First {number} Fibonacci numbers:
                                            </p>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {result.value.map((num, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-white px-4 py-2 rounded-lg font-bold text-purple-600 shadow-md"
                                                    >
                                                        {num}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {result.type === 'prime' && (
                                        <div className="text-center">
                                            <div
                                                className={`text-3xl font-bold mb-2 ${result.value.isPrime ? 'text-green-600' : 'text-orange-600'
                                                    }`}
                                            >
                                                {result.value.isPrime ? '✅ Prime Number!' : '❌ Not Prime'}
                                            </div>
                                            <p className="text-gray-700 font-semibold text-lg">
                                                {result.value.message}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Concepts Footer */}
                <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                        💡 Concepts Used
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-blue-700">React Hooks</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-purple-700">useState</span>
                        </div>
                        <div className="bg-pink-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-pink-700">Functional Components</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-green-700">Event Handling</span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-yellow-700">Conditional Rendering</span>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-indigo-700">Loops</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CombinedLab1;
