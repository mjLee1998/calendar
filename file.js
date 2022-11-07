window.onload = () => {
    const fileInput = document.getElementById('fileUpload');

    const handleFiles = () => {
        const selectedFile = [...fileInput.files];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(selectedFile[0]);

        fileReader.onload = function () {
            for (i = 0; i < selectedFile.length; i++) {
                document.getElementById('previewImg').src = fileReader.result;
            }
        };
    };

    fileInput.addEventListener('change', handleFiles);
};
