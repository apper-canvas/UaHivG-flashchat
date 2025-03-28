import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCcw, Smile, Download, Send, X, Image as ImageIcon, FlipHorizontal } from "lucide-react";

const filters = [
  { id: "normal", name: "Normal", style: {} },
  { id: "grayscale", name: "B&W", style: { filter: "grayscale(100%)" } },
  { id: "sepia", name: "Sepia", style: { filter: "sepia(100%)" } },
  { id: "saturate", name: "Vibrant", style: { filter: "saturate(200%)" } },
  { id: "blur", name: "Blur", style: { filter: "blur(2px)" } },
  { id: "contrast", name: "Contrast", style: { filter: "contrast(150%)" } },
  { id: "hue", name: "Hue", style: { filter: "hue-rotate(90deg)" } },
  { id: "invert", name: "Invert", style: { filter: "invert(80%)" } },
];

const MainFeature = () => {
  const [activeCamera, setActiveCamera] = useState("back");
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [caption, setCaption] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [stream, setStream] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (capturedImage) return;
    
    let videoStream = null;
    
    const initCamera = async () => {
      try {
        // Stop any existing streams
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        // Set facing mode based on activeCamera state
        const facingMode = activeCamera === "front" ? "user" : "environment";
        
        // Request camera access with the specified facing mode
        const constraints = {
          video: { 
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };
        
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(newStream);
        
        // Connect stream to video element
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          setCameraError(null);
        }
      } catch (err) {
        console.error("Camera error:", err);
        
        // Handle different error types
        if (err.name === "NotAllowedError") {
          setCameraError("Camera permission denied. Please allow camera access to use this feature.");
        } else if (err.name === "NotFoundError") {
          // If requested camera is not available, try the other camera
          if (activeCamera === "back") {
            setActiveCamera("front");
          } else {
            setCameraError("No camera found on your device.");
          }
        } else {
          setCameraError(`Camera error: ${err.message}`);
        }
        
        // Use placeholder as fallback
        usePlaceholderImage();
      }
    };
    
    // Fallback to placeholder if camera access fails
    const usePlaceholderImage = () => {
      const placeholderImage = new Image();
      placeholderImage.src = "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      
      placeholderImage.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          
          // Function to draw the image repeatedly to simulate video
          const drawImage = () => {
            if (!canvasRef.current) return;
            ctx.drawImage(placeholderImage, 0, 0, canvasRef.current.width, canvasRef.current.height);
            if (!capturedImage) {
              requestAnimationFrame(drawImage);
            }
          };
          
          drawImage();
        }
      };
    };
    
    initCamera();
    
    // Clean up: stop camera stream when component unmounts or when capturing an image
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage, activeCamera]);
  
  const captureImage = () => {
    if (!videoRef.current && !canvasRef.current) return;
    
    const canvas = document.createElement('canvas');
    const videoElement = videoRef.current;
    
    if (videoElement && videoElement.videoWidth) {
      // Use video dimensions if available
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      const ctx = canvas.getContext('2d');
      
      // If front camera, flip the image horizontally
      if (activeCamera === "front") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      
      ctx.drawImage(videoElement, 0, 0);
    } else if (canvasRef.current) {
      // Fallback to canvas placeholder
      canvas.width = canvasRef.current.width;
      canvas.height = canvasRef.current.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(canvasRef.current, 0, 0);
    }
    
    setCapturedImage(canvas.toDataURL('image/jpeg'));
    setShowFilters(true);
  };
  
  const switchCamera = () => {
    setActiveCamera(prev => prev === "back" ? "front" : "back");
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setShowFilters(false);
    setSelectedFilter(filters[0]);
    setCaption("");
  };
  
  const handleSend = () => {
    setIsSending(true);
    
    // Simulate sending process
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        resetCapture();
      }, 2000);
    }, 1500);
  };
  
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target.result);
      setShowFilters(true);
      setShowUploadOption(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="camera-container flex-1 relative">
        {!capturedImage ? (
          <>
            {/* Live camera feed */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className={`w-full h-full object-cover ${activeCamera === "front" ? "scale-x-[-1]" : ""}`}
              style={{ display: cameraError ? "none" : "block" }}
            />
            
            {/* Fallback canvas for placeholder or error states */}
            {cameraError && (
              <canvas 
                ref={canvasRef} 
                width={375} 
                height={667} 
                className="w-full h-full object-cover"
              />
            )}
            
            <div className="camera-overlay"></div>
            
            {/* Camera error message */}
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 p-4 rounded-lg max-w-xs text-center">
                  <p className="text-white mb-3">{cameraError}</p>
                  <button 
                    className="btn btn-primary text-sm py-1"
                    onClick={() => {
                      setCameraError(null);
                      setActiveCamera(activeCamera === "front" ? "back" : "front");
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
            
            {/* Camera Controls */}
            <div className="absolute bottom-6 inset-x-0 flex justify-center items-center space-x-8">
              <motion.button
                className="p-3 rounded-full bg-surface-200 bg-opacity-30 backdrop-blur-md"
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowUploadOption(true)}
              >
                <ImageIcon size={24} color="white" />
              </motion.button>
              
              <motion.button
                className="capture-button"
                whileTap={{ scale: 0.9 }}
                onClick={captureImage}
              />
              
              <motion.button
                className="p-3 rounded-full bg-surface-200 bg-opacity-30 backdrop-blur-md flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
                onClick={switchCamera}
                title={`Switch to ${activeCamera === "back" ? "front" : "back"} camera`}
              >
                <FlipHorizontal size={24} color="white" />
              </motion.button>
            </div>
            
            {/* Camera indicator */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-40 backdrop-blur-sm py-1 px-3 rounded-full">
              <span className="text-white text-xs font-medium">
                {activeCamera === "front" ? "Front Camera" : "Back Camera"}
              </span>
            </div>
            
            {/* Upload Option */}
            <AnimatePresence>
              {showUploadOption && (
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white dark:bg-surface-800 p-6 rounded-2xl w-4/5 max-w-sm"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Upload Image</h3>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowUploadOption(false)}
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                    
                    <p className="text-surface-500 mb-4 text-sm">
                      Choose an image from your device to share
                    </p>
                    
                    <label className="block w-full">
                      <motion.div
                        className="flex items-center justify-center p-4 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center">
                          <ImageIcon size={32} className="mb-2 text-surface-400" />
                          <span className="text-sm font-medium">Select Image</span>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleUploadImage}
                        />
                      </motion.div>
                    </label>
                    
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="px-4 py-2 text-surface-500 rounded-lg"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowUploadOption(false)}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="relative h-full">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover"
              style={selectedFilter.style}
            />
            
            {/* Filter Selection */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-medium">Filters</h3>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowFilters(false)}
                      className="text-white"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                  
                  <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {filters.map(filter => (
                      <motion.button
                        key={filter.id}
                        className={`flex flex-col items-center ${selectedFilter.id === filter.id ? 'opacity-100' : 'opacity-70'}`}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedFilter(filter)}
                      >
                        <div 
                          className="w-16 h-16 rounded-lg overflow-hidden mb-1 border-2"
                          style={{
                            borderColor: selectedFilter.id === filter.id ? '#FFFC00' : 'transparent'
                          }}
                        >
                          <img 
                            src={capturedImage} 
                            alt={filter.name} 
                            className="w-full h-full object-cover"
                            style={filter.style}
                          />
                        </div>
                        <span className="text-xs text-white">{filter.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Caption Input */}
            {!showFilters && (
              <motion.div
                className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-md rounded-full overflow-hidden pr-2">
                  <input
                    type="text"
                    placeholder="Add a caption..."
                    className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-white placeholder-opacity-70"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFilters(true)}
                    className="p-2 text-white"
                  >
                    <Smile size={20} />
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Top Controls */}
            <div className="absolute top-4 inset-x-0 flex justify-between px-4">
              <motion.button
                className="p-2 rounded-full bg-black bg-opacity-30 backdrop-blur-sm"
                whileTap={{ scale: 0.9 }}
                onClick={resetCapture}
              >
                <X size={20} color="white" />
              </motion.button>
              
              {!showFilters && (
                <div className="flex space-x-3">
                  <motion.button
                    className="p-2 rounded-full bg-black bg-opacity-30 backdrop-blur-sm"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download size={20} color="white" />
                  </motion.button>
                  
                  <motion.button
                    className="p-2 rounded-full bg-primary"
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    disabled={isSending}
                  >
                    <Send size={20} color="black" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Loading/Success Overlay */}
        <AnimatePresence>
          {(isSending || showSuccess) && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isSending ? (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <div className="w-16 h-16 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-white font-medium">Sending...</p>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white font-medium">Sent successfully!</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;