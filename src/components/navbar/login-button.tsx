interface LoginButtonProps {
  text: string;
}
const LoginButton = ({ text }: LoginButtonProps) => {
  return (
    <button
      className='border-beige-ergo-navbar dark:border-yellow-ergo-navbar text-beige-ergo-navbar
        dark:text-yellow-ergo-navbar bg-green-ergo-navbar hover:bg-dark-green-ergo-navbar h-10 w-32 rounded-xl
        border-[3px] text-lg font-bold transition-colors duration-300 ease-linear hover:transition-none'
    >
      {text}
    </button>
  );
};

export default LoginButton;
