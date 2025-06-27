import React, { useState } from "react";
import { Image, X, Download, Heart, Share2, ZoomIn } from "lucide-react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const dummyData = [
  {
    id: 1,
    title: "गजानन महाराज 1",
    description: "यह चित्र गजानन महाराज के ध्यानस्थ अवस्था को दर्शाता है।",
  },
  {
    id: 2,
    title: "गजानन महाराज 2",
    description: "यह चित्र भक्तों के साथ महाराज की उपस्थिति को दर्शाता है।",
  },
  {
    id: 3,
    title: "गजानन महाराज 3",
    description: "महाराज की पदयात्रा का एक दुर्लभ चित्र।",
  },
  {
    id: 4,
    title: "गजानन महाराज 4",
    description: "संतों की संगति में महाराज।",
  },
  {
    id: 5,
    title: "गजानन महाराज 5",
    description: "गुरुकृपा से प्रकाशित चित्र।",
  },
  {
    id: 6,
    title: "गजानन महाराज 6",
    description: "प्रसाद वितरण करते हुए महाराज।",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState([]);

  const toggleLike = (imageId) => {
    setLikedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const openLightbox = (imageId) => setSelectedImage(imageId);
  const closeLightbox = () => setSelectedImage(null);

  const selectedImageData = dummyData.find((item) => item.id === selectedImage);

  return (
    <div className="bg-light py-4">
      <Container>
        <div className="text-center mb-5">
          <div className="mb-3">
            <Image size={32} />
          </div>
          <h2>गैलरी</h2>
          <p className="text-muted">गजानन महाराज और उपासना के पवित्र चित्र</p>
        </div>

        <Card className="p-3 shadow-sm mb-4 bg-light">
          <Row className="text-center">
            <Col xs={6} className="mb-3">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <Image size={24} className="mb-2 text-primary" />
                <h5>{dummyData.length}</h5>
                <small>कुल चित्र</small>
              </div>
            </Col>
            <Col xs={6} className="mb-3">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <Heart size={24} className="mb-2 text-danger" />
                <h5>{likedImages.length}</h5>
                <small>पसंदीदा</small>
              </div>
            </Col>
          </Row>

          <Row className="text-center">
            <Col xs={6} className="mb-2">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <Download size={24} className="mb-2 text-success" />
                <h5>42</h5>
                <small>डाउनलोड</small>
              </div>
            </Col>
            <Col xs={6} className="mb-2">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <Share2 size={24} className="mb-2 text-purple" />
                <h5>18</h5>
                <small>साझा किया</small>
              </div>
            </Col>
          </Row>
        </Card>

        <Row xs={1} md={2} lg={3} className="g-4">
          {dummyData.map((item) => (
            <Col key={item.id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>

                <Card.Img
                  variant="bottom"
                  src={`https://picsum.photos/400/300?random=${item.id}`}
                  alt={item.title}
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                    height: "200px",
                  }}
                  onClick={() => openLightbox(item.id)}
                />

                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Button
                    variant={
                      likedImages.includes(item.id)
                        ? "danger"
                        : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => toggleLike(item.id)}
                  >
                    <Heart
                      size={16}
                      fill={
                        likedImages.includes(item.id) ? "currentColor" : "none"
                      }
                      className="me-1"
                    />
                    पसंद
                  </Button>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      <Download size={16} />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Share2 size={16} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Lightbox Modal */}
        {selectedImage && selectedImageData && (
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex align-items-center justify-content-center z-50">
            <div className="position-relative text-white text-center p-3">
              <button
                className="position-absolute top-0 end-0 m-3 btn btn-light"
                onClick={closeLightbox}
              >
                <X size={24} />
              </button>
              <img
                src={`https://picsum.photos/800/600?random=${selectedImage}`}
                alt={selectedImageData.title}
                className="img-fluid rounded mb-3"
              />
              <h4>{selectedImageData.title}</h4>
              <p>{selectedImageData.description}</p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button
                  variant={
                    likedImages.includes(selectedImage) ? "danger" : "light"
                  }
                  onClick={() => toggleLike(selectedImage)}
                >
                  <Heart
                    size={16}
                    fill={
                      likedImages.includes(selectedImage)
                        ? "currentColor"
                        : "none"
                    }
                    className="me-2"
                  />
                  पसंद
                </Button>
                <Button variant="light">
                  <Download size={16} className="me-2" />
                  डाउनलोड
                </Button>
                <Button variant="light">
                  <Share2 size={16} className="me-2" />
                  साझा करें
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
