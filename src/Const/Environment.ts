interface Environment {}

const dev: Environment = {};

const stage: Environment = {};

const prod: Environment = {};

let env: Environment = dev;

if (
  process.env.REACT_APP_ENV &&
  process.env.REACT_APP_ENV.trim() === "production"
) {
  env = prod;
} else if (
  process.env.REACT_APP_ENV &&
  process.env.REACT_APP_ENV.trim() === "stage"
) {
  env = stage;
}

export default env;
