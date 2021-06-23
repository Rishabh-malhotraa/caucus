const getRandomColor = () => {
  const avatar = [
    "https://i.pinimg.com/originals/57/47/06/57470642bba41d1b079cb9926117fe6e.jpg", // goku
    "https://i.pinimg.com/236x/b6/d9/58/b6d9586cb24fdd802dd70d0c6b17f2b0.jpg", // jerry 1
    "https://i.pinimg.com/236x/9d/aa/e2/9daae24f4ca34cfecb368d0590930934.jpg", // jerry2
    "https://i1.sndcdn.com/avatars-000406450287-rukoyr-t500x500.jpg", // squirtle
    "https://i.pinimg.com/originals/97/9e/a3/979ea3e13fe19f047f1918c640531edf.jpg", // pikachu
    "https://i.pinimg.com/originals/6a/b8/ed/6ab8ed1a70bd7c744c7fda2fd0803b18.jpg", // winneh
    "https://i.pinimg.com/originals/5a/6e/49/5a6e498e40b1dcd9e0fef062db163e93.jpg", // tigor
    "https://i.pinimg.com/564x/1d/fc/27/1dfc278c0f56a18c98ada502916ee70b.jpg", // stich
    "https://avatars.githubusercontent.com/u/47313528?v=4", // github avatar
    "https://i1.sndcdn.com/avatars-000542389239-i206kr-t500x500.jpg", // doge
  ];

  return avatar[Math.floor(Math.random() * avatar.length)];
};

export default getRandomColor;
