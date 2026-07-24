type HeroProps = {
  name: string;
  title: string;
  email: string;
};

function Hero(props: HeroProps) {
  return (
    <section className="flex min-h-[calc(100vh-72px)] items-center justify-center text-center">
      <div>
        <p className="mb-8 text-3xl text-green-400">
          I love Splunking
        </p>

        <h1 className="text-7xl font-bold italic text-white">
          {props.name}
        </h1>

        <p className="mt-9 text-xl text-gray-400">
          {props.title}
        </p>

        <p className="mt-4 text-xl font-bold text-amber-200">
          {props.email}
        </p>
      </div>
    </section>
  );
}

export default Hero;