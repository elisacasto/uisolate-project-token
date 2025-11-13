import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';
import { build } from 'vite';



register(StyleDictionary, {
  withSDBuiltins: false,
});

console.log();

StyleDictionary.registerTransform({
  name: "assets/background",
  type: "value",
  filter: (token) => token.$type === "asset",
  transform: (token) => `url("/app/assets/${token.$value}")`,
})

const loader = ThemesLoader(StyleDictionary);

async function run() {
  const themes = await loader.load("/tokens")

 // themes.print ();

  const globalTheme = themes.getThemeByName("global")
  const lightTheme = themes.getThemeByName("light");
  const darkTheme = themes.getThemeByName("dark")
  const mobileTheme = themes.getThemeByName("mobile");
  const desktopTheme = themes.getThemeByName("desktop");

  const globalConfig = {
    expand: {
      typesMap: true
    },
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/global/variables.css",
          },
        ],
        transforms:[
          "name/kebab",
          "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight",
        ]
      }
    }
  }

  const desktopConfig = {
    expand: {
      typesMap: true
    },
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/desktop/variables.css",
          },
        ],
        transforms:[
          "name/kebab",
          "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight",
        ]
      }
    }
  }

const mobileConfig = {
    expand: {
      typesMap: true
    },
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/mobile/variables.css",
          },
        ],
        transforms:[
          "name/kebab",
          "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight",
        ]
      }
    }
  }


 const lightConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/light/variables.css",
            options: {
              selector: ".light"
            }
          }
        ],
        transforms:[
         "name/kebab",
         "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight",
          "assets/background"
        ]
      },
    }
  }

  const darkConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/dark/variables.css",
            options: {
              selector: ".dark"
            }
          }
        ],
        transforms:[
         "name/kebab",
         "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight",
          "assets/background"
        ]
      },
    }
  }


  globalTheme.addConfig(globalConfig).build()
  lightTheme.addConfig(lightConfig).build()
  darkTheme.addConfig(darkConfig).build()
  desktopTheme.addConfig(desktopConfig).build();
  mobileTheme.addConfig(mobileConfig).build();



}

run();
