const defaultTheme = () => {
    document.querySelector('div').className = 'container default';
};
    

const oceanTheme = () => {
    document.querySelector('div').className = 'container ocean';
};

const desertTheme = () => {
    document.querySelector('div').className = 'container desert';
};


document.querySelector('#default').onclick = defaultTheme;
document.querySelector('#ocean').onclick = oceanTheme;
document.querySelector('#desert').onclick = desertTheme;

