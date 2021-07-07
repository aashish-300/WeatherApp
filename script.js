const apiId = "bfef3cff51ce592165a333da5021e77f";

const data = async () => {
  try {
    const res = await (
      await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=California&appid=${apiId}`
      )
    ).json();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

data();
