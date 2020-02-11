// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Storyblok Boilerplate",
  plugins: [
    {
      use: "gridsome-source-storyblok",
      options: {
        client: {
          accessToken: "f2u4dLnrVwVuhL9rU6PvSgtt"
        }
      }
    }
  ]
};
