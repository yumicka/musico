import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function UpdateProfileInformationForm({
  mustVerifyEmail,
  status,
  className = '',
}) {
  const user = usePage().props.auth.user;

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const fileInput = useRef(null);

  const [preview, setPreview] = useState(null);

  const { data, setData, errors, post, processing, recentlySuccessful } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    profile_photo: null,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user?.name, user?.email]);

  const avatarUrl = preview
    ? preview
    : user?.profile_photo_path
      ? `/storage/${user.profile_photo_path}`
      : '/images/default_avatar.png';

  const submit = (e) => {
    e.preventDefault();

    post(route('profile.update'), {
      _method: 'put',
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setData('profile_photo', null);
        if (fileInput.current) fileInput.current.value = '';
      },
      onError: (errs) => {
        if (errs.name && nameInput.current) nameInput.current.focus();
        if (errs.email && emailInput.current) emailInput.current.focus();
        if (errs.profile_photo && fileInput.current) fileInput.current.focus();
      },
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Profīla informācija
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Atjauno vārdu, e-pastu un profila foto.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt="Profile avatar"
            className="h-20 w-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />

          <label className="cursor-pointer text-sm text-indigo-600 hover:underline">
            Atjaunot foto
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setData('profile_photo', file);

                if (preview) URL.revokeObjectURL(preview);

                if (file) {
                  setPreview(URL.createObjectURL(file));
                } else {
                  setPreview(null);
                }
              }}
            />
          </label>
        </div>

        <InputError className="mt-2" message={errors.profile_photo} />

        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            ref={nameInput}
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            ref={emailInput}
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
              Your email address is unverified.{' '}
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton type="submit" disabled={processing}>
            Save
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Saglabāts!
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
