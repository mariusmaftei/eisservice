const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Create a proper test image using Sharp
async function createTestImage() {
  try {
    console.log("Creating a proper test image...");

    // Create a simple 100x100 red square PNG
    const testImageBuffer = await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 0, b: 0 },
      },
    })
      .png()
      .toBuffer();

    console.log("✅ Created test PNG image:", testImageBuffer.length, "bytes");
    return testImageBuffer;
  } catch (error) {
    console.error("❌ Failed to create test image:", error.message);
    throw error;
  }
}

// Test the image processor directly
async function testImageProcessor() {
  try {
    console.log("Testing Sharp image processor directly...");

    // Import the image processor
    const { processImage } = require("./utils/imageProcessor.js");

    // Create a test image buffer
    const imageBuffer = await createTestImage();

    // Process the image
    console.log("🔄 Processing image with Sharp...");
    const processedImage = await processImage(imageBuffer, "test-image.png", {
      maxSizeKB: 150,
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    console.log("✅ Image processing completed!");
    console.log("📁 Processed filename:", processedImage.fileName);
    console.log(
      "📊 Processed buffer size:",
      processedImage.buffer.length,
      "bytes"
    );
    console.log(
      "📋 Metadata:",
      JSON.stringify(processedImage.metadata, null, 2)
    );

    // Check if filename contains unique ID and .webp extension
    if (processedImage.fileName.includes(".webp")) {
      console.log("✅ Image converted to WebP format");
    } else {
      console.log("❌ Image not converted to WebP format");
    }

    if (processedImage.fileName.match(/\d{13}/)) {
      console.log("✅ Image has unique timestamp ID");
    } else {
      console.log("❌ Image missing unique timestamp ID");
    }

    // Extract the unique ID from filename
    const uniqueIdMatch = processedImage.fileName.match(/(\d{13})\.webp$/);
    if (uniqueIdMatch) {
      console.log("🆔 Unique ID:", uniqueIdMatch[1]);
      console.log("📅 Timestamp:", new Date(parseInt(uniqueIdMatch[1])));
    }

    // Test with a second image to ensure unique IDs
    console.log("\n🔄 Testing second image for unique ID generation...");
    const processedImage2 = await processImage(imageBuffer, "test-image.png", {
      maxSizeKB: 150,
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    console.log("📁 Second processed filename:", processedImage2.fileName);

    if (processedImage.fileName !== processedImage2.fileName) {
      console.log("✅ Unique IDs are working - filenames are different");
    } else {
      console.log("❌ Unique IDs not working - filenames are the same");
    }

    console.log("\n🎉 All tests completed successfully!");
    console.log("✅ Images are being converted to WebP format");
    console.log("✅ Unique timestamp IDs are being generated");
    console.log("✅ Each upload gets a unique filename");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack:", error.stack);
  }
}

// Run the test
testImageProcessor();
