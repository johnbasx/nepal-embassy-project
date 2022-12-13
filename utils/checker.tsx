export const checkFullRefresh = () => {
  if (performance.navigation.type === 1) {
    console.log('This page is reloaded');
  } else {
    console.log('This page is not reloaded');
  }
};
