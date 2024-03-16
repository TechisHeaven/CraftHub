// here we can access if environment variable is undefined then while sanitizing it show error
export interface ENV {
  VITE_API_URL: string | undefined;
}

// ENV variables type information and here final config that will return with sanitized variables
export interface Config {
  VITE_API_URL: string;
}
