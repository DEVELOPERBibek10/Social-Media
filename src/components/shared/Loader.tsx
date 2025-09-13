interface LoaderProps {
  w?: number;
  h?: number;
}
const Loader = ({ w, h }: LoaderProps) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/10631/10631014.png"
          alt=""
          width={w}
          height={h}
          className="animate-spin"
        />
      </div>
    </>
  );
};

export default Loader;
