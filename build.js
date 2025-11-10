import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';



register(StyleDictionary, {
  withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
  const themes = await loader.load("/tokens")

  themes.print ();

  const globalTheme = themes.getThemeByName("global")
  const lightTheme = themes.getThemeByName("light")

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
          "ts/size/lineheight"
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
          }
        ],
        transforms:[
         "name/kebab",
        ]
      },
    }
  }



  globalTheme.addConfig(globalConfig).build(),
  lightTheme.addConfig(lightConfig).build()



}

run();
