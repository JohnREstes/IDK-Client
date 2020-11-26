export const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgb(255, 255, 255)",
      // match with the menu
      borderRadius: "3px 3px 0 0",
      // Overwrittes the different states of border
      borderColor: "black",
      // Removes weird border around container
      boxShadow: null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "black"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })}