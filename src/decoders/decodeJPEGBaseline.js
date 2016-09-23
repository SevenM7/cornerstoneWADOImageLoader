(function ($, cornerstone, cornerstoneWADOImageLoader) {

  "use strict";

  function decodeJPEGBaseline(dataSet, frame)
  {
    var height = dataSet.uint16('x00280010');
    var width = dataSet.uint16('x00280011');
    var bitsAllocated = dataSet.uint16('x00280100');
    var encodedImageFrame = cornerstoneWADOImageLoader.getEncodedImageFrame(dataSet, frame);
    var jpeg = new JpegImage();
    
    // Set color conversion to false, in case for YBR_FULL
    jpeg.colorTransform = false;
    
    jpeg.parse( encodedImageFrame );
    if(bitsAllocated === 8) {
      return jpeg.getData(width, height);
    }
    else if(bitsAllocated === 16) {
      return jpeg.getData16(width, height);
    }
  }

  cornerstoneWADOImageLoader.decodeJPEGBaseline = decodeJPEGBaseline;
}($, cornerstone, cornerstoneWADOImageLoader));
