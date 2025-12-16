import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Ielogoties" />
            <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
                <div className="max-w-md w-full">
                    
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Ielogoties kontā
                        </h2>
                        <p className="text-gray-400">
                            Lai turpinātu ar Musico
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700 text-green-400 text-sm">
                            {status}
                        </div>
                    )}

                    <div className="bg-[#111] border border-[#333] rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={submit}>
                            {/* Поле email */}
                            <div className="mb-6">
                                <InputLabel 
                                    htmlFor="email" 
                                    value="E-pasts" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                />

                                <div className="relative">
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full bg-[#1a1a1a] border-[#333] text-white rounded-lg py-3 px-4 focus:border-[#1aa58c] focus:ring focus:ring-[#1aa58c] focus:ring-opacity-20 transition-all duration-200"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="jūsu@epasts.lv"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <InputError message={errors.email} className="mt-2 text-red-400" />
                            </div>

                            {/* Поле пароля */}
                            <div className="mb-6">
                                <InputLabel 
                                    htmlFor="password" 
                                    value="Parole" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                />

                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full bg-[#1a1a1a] border-[#333] text-white rounded-lg py-3 px-4 focus:border-[#1aa58c] focus:ring focus:ring-[#1aa58c] focus:ring-opacity-20 transition-all duration-200"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>

                                <InputError message={errors.password} className="mt-2 text-red-400" />
                            </div>

                            
                            <div className="mb-6 flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData('remember', e.target.checked)
                                            }
                                            className="w-5 h-5 text-[#1aa58c] bg-[#1a1a1a] border-[#444] rounded focus:ring-2 focus:ring-[#1aa58c] focus:ring-offset-0"
                                        />
                                    </div>
                                    <span className="ms-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Atcerieties mani
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-[#1aa58c] hover:text-[#158f77] underline underline-offset-2 transition-colors"
                                    >
                                        Aizmirsāt paroli?
                                    </Link>
                                )}
                            </div>

                           
                            <div className="mb-6">
                                <PrimaryButton 
                                    className="w-full justify-center py-3 px-4 bg-gradient-to-r from-[#1aa58c] to-[#148f77] hover:from-[#148f77] hover:to-[#117a64] text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#1aa58c]/20 active:scale-95"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Ielogošanās...
                                        </span>
                                    ) : (
                                        'Ielogoties'
                                    )}
                                </PrimaryButton>
                            </div>

                            
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#333]"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-[#111] text-gray-500">
                                        Vai
                                    </span>
                                </div>
                            </div>

                            
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">
                                    Nav konta?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-medium text-[#1aa58c] hover:text-[#158f77] underline underline-offset-2 transition-colors"
                                    >
                                        Reģistrēties
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            Jūsu dati ir drošībā. Mēs izmantojam šifrēšanu, lai aizsargātu jūsu personīgo informāciju.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}