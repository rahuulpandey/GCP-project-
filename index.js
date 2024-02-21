const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');

const storage = new Storage();
const visionClient = new vision.ImageAnnotatorClient();

exports.processImage = async (event, context) => {
  const file = event.data;
  const bucketName = file.bucket;
  const fileName = file.name;

  const imageUri = `gs://${bucketName}/${fileName}`;

  try {
    // Analyze the image using Google Cloud Vision API
    const [result] = await visionClient.labelDetection(imageUri);
    const labels = result.labelAnnotations.map(label => label.description);

    console.log(`Labels for ${fileName}:`, labels);

    // Perform further processing or store the results as needed
  } catch (error) {
    console.error(`Error processing image ${fileName}:`, error);
  }
};

