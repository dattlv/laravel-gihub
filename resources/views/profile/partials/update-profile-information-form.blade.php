<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('Profile Information') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <!-- Profile Photo -->
        @if ($user->avatar)
        <div class="mt-4">
            <x-input-label :value="__('Profile Photo')" />
            <div class="mt-2">
                <img src="{{ $user->avatar }}" alt="{{ $user->name }}" class="rounded-full h-20 w-20 object-cover">
                <p class="mt-1 text-sm text-gray-500">{{ __('Photo from social login') }}</p>
            </div>
        </div>
        @endif

        <div class="mt-4">
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)" required autocomplete="username" />
            <x-input-error class="mt-2" :messages="$errors->get('email')" />

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                <div>
                    <p class="text-sm mt-2 text-gray-800">
                        {{ __('Your email address is unverified.') }}

                        <button form="send-verification" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-green-600">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <!-- Connected Social Accounts -->
        <div class="mt-6 space-y-6">
            <h2 class="text-lg font-medium text-gray-900">
                {{ __('Connected Accounts') }}
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                {{ __('Manage your connected social media accounts.') }}
            </p>

            <div class="mt-6">
                <div class="flex items-center space-x-3">
                    <div>
                        <svg class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-900">Google</span>
                        @if($user->provider === 'google')
                            <span class="ml-2 text-xs text-green-500">{{ __('Connected') }}</span>
                        @else
                            <a href="{{ url('auth/google') }}" class="ml-2 text-xs text-blue-600 hover:underline">{{ __('Connect') }}</a>
                        @endif
                    </div>
                </div>

                <div class="flex items-center mt-3 space-x-3">
                    <div>
                        <svg class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-900">Facebook</span>
                        @if($user->provider === 'facebook')
                            <span class="ml-2 text-xs text-green-500">{{ __('Connected') }}</span>
                        @else
                            <a href="{{ url('auth/facebook') }}" class="ml-2 text-xs text-blue-600 hover:underline">{{ __('Connect') }}</a>
                        @endif
                    </div>
                </div>

                <div class="flex items-center mt-3 space-x-3">
                    <div>
                        <svg class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-900">GitHub</span>
                        @if($user->provider === 'github')
                            <span class="ml-2 text-xs text-green-500">{{ __('Connected') }}</span>
                        @else
                            <a href="{{ url('auth/github') }}" class="ml-2 text-xs text-blue-600 hover:underline">{{ __('Connect') }}</a>
                        @endif
                    </div>
                </div>

                <div class="flex items-center mt-3 space-x-3">
                    <div>
                        <svg class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.721.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-900">GitLab</span>
                        @if($user->provider === 'gitlab')
                            <span class="ml-2 text-xs text-green-500">{{ __('Connected') }}</span>
                        @else
                            <a href="{{ url('auth/gitlab') }}" class="ml-2 text-xs text-blue-600 hover:underline">{{ __('Connect') }}</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('Save') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600"
                >{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
