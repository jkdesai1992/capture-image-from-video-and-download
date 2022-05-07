import React from "react";

const scaleFactor = 0.25;
class AddVideo extends React.Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.state = {
      fields: {
        videoUrl: "",
        isLocal: false
      }
    };
  }

  onLocalCall = () => {
    const { fields } = this.state;
    const file = fields && fields.video;
    const videoNode = document.querySelector("video");
    const fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
  };

  handelSubmit = async () => {
    console.log("capture image base base64========>", this.state.image.src);
  };

  onUploadVideo = (e) => {
    const { fields } = this.state;
    const file = e.target.files && e.target.files[0];
    this.setState(
      {
        fields: {
          ...fields,
          video: file
        }
      },
      () => this.onLocalCall()
    );
  };

  handelVideo = () => {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        isLocal: !fields.isLocal,
        videoUrl: ""
      }
    });
  };

  onChange = (e) => {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        [e.target.name]: e.target.value
      }
    });
  };

  capture = (video, scaleFactor) => {
    if (scaleFactor == null) {
      scaleFactor = 1;
    }
    // const w = video && video.videoWidth * scaleFactor;
    // const h = video && video.videoHeight * scaleFactor;
    const w = 900;
    const h = 500;
    // const canvas = document.createElement('canvas');
    const canvas = this.canvasRef.current;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
  };

  convertCanvasToImage = (canvas) => {
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  };

  getSnapshot = async () => {
    const video = document.getElementById("video");
    const canvas = await this.capture(video, scaleFactor);
    const image = await this.convertCanvasToImage(canvas);
    this.setState({ image: image });
  };

  render() {
    const { fields } = this.state;
    return (
      <div className="animated fadeIn">
        <div>
          <div className="controls">
            <input type="checkbox" onClick={() => this.handelVideo()} /> Check
            me for upload local video
            <div>
              {fields.isLocal ? (
                <div>
                  <div id="message" />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={this.onUploadVideo}
                  />
                  <div className="controls">
                    <div>
                      <video
                        id="video"
                        width="auto"
                        height="auto"
                        controls={true}
                        crossOrigin="anonymous"
                      >
                        <source src={fields.videoUrl} />
                      </video>
                      <br />
                      <button type="info" onClick={() => this.getSnapshot()}>
                        Capture
                      </button>
                      <br />
                      <canvas id="screenshot" ref={this.canvasRef} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label>Video Link</label>
                  <div className="controls">
                    <input
                      name="videoUrl"
                      value={fields.videoUrl}
                      onChange={this.onChange}
                      type="text"
                    />
                    {/*<span className="text-monospace text-danger">{errors && errors.category}</span>*/}
                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
        </div>
        <div>
          {fields && fields.videoUrl ? (
            <div>
              <label>Video Preview</label>
              <div className="controls">
                <div
                  style={{
                    border: "solid 1px #ccc",
                    padding: "10px",
                    textAlign: "center"
                  }}
                >
                  <video
                    id="video"
                    width="420"
                    controls="true"
                    crossOrigin="anonymous"
                  >
                    <source src={fields.videoUrl} />
                  </video>
                  <br />
                  <button type="info" onClick={() => this.getSnapshot()}>
                    Capture
                  </button>
                  <br />
                  <canvas
                    id="screenshot"
                    ref={this.canvasRef}
                    height={1000}
                    width={1000}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {this?.state?.image?.src && (
          <div>
            <a href={this?.state?.image?.src} download="filename.png">
              download
            </a>
            <button type="submit" color="primary" onClick={this.handelSubmit}>
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default AddVideo;
