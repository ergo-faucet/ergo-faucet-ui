interface LoginButtonProps {
  text: string;
}
const LoginButton = ({ text }: LoginButtonProps) => {
  return (
    <button className='w-32 h-10 font-bold text-lg rounded-xl border-[3px] border-beige-ergo-navbar dark:border-yellow-ergo-navbar   text-beige-ergo-navbar dark:text-yellow-ergo-navbar bg-green-ergo-navbar hover:bg-dark-green-ergo-navbar hover:transition-none transition-colors duration-300 ease-linear'>
      {text}
    </button>
  );
};

export default LoginButton;
