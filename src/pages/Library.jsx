import React, { useState } from "react";
import { Container, Card, Row, Col, Badge, Button, Form, InputGroup } from "react-bootstrap";
import { BsSearch, BsBook, BsPlayCircle, BsDownload, BsHeart, BsHeartFill } from "react-icons/bs";
import { useLanguage } from "../context/LanguageContext";
import PageLayout from "../PageLayout";

export default function Library() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([1, 3]);

  const categories = [
    { id: "all", name: "All", icon: "📚" },
    { id: "scriptures", name: "Scriptures", icon: "🕉️" },
    { id: "bhajans", name: "Bhajans", icon: "🎵" },
    { id: "stories", name: "Stories", icon: "📖" },
    { id: "meditation", name: "Meditation", icon: "🧘" },
    { id: "prayers", name: "Prayers", icon: "🙏" }
  ];

  const books = [
    {
      id: 1,
      title: "Bhagavad Gita",
      author: "Lord Krishna",
      category: "scriptures",
      description: "The sacred Hindu scripture containing the teachings of Lord Krishna to Arjuna",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      type: "book",
      rating: 5,
      pages: 700,
      language: "Sanskrit/English"
    },
    {
      id: 2,
      title: "Ramayana",
      author: "Valmiki",
      category: "scriptures",
      description: "Ancient Indian epic about Lord Rama's journey and dharma",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      type: "book",
      rating: 5,
      pages: 500,
      language: "Sanskrit/Hindi"
    },
    {
      id: 3,
      title: "Gajanan Maharaj Aarti",
      author: "Traditional",
      category: "bhajans",
      description: "Devotional songs dedicated to Gajanan Maharaj",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      type: "audio",
      duration: "15 min",
      language: "Marathi"
    },
    {
      id: 4,
      title: "Morning Prayers",
      author: "Traditional",
      category: "prayers",
      description: "Collection of morning prayers and mantras",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      type: "audio",
      duration: "10 min",
      language: "Sanskrit"
    },
    {
      id: 5,
      title: "Meditation Guide",
      author: "Swami Vivekananda",
      category: "meditation",
      description: "Complete guide to meditation techniques and practices",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      type: "book",
      rating: 4,
      pages: 200,
      language: "English"
    },
    {
      id: 6,
      title: "Stories of Saints",
      author: "Various",
      category: "stories",
      description: "Inspiring stories of great saints and their teachings",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      type: "book",
      rating: 4,
      pages: 300,
      language: "Hindi/English"
    }
  ];

  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : "📚";
  };

  const getTypeIcon = (type) => {
    return type === "audio" ? <BsPlayCircle /> : <BsBook />;
  };

  const getTypeBadge = (type) => {
    return type === "audio" ? "Audio" : "Book";
  };

  return (
    <PageLayout>
      <Container className="py-4">
        <h2 className="common-heading mb-4">Library</h2>

        {/* Search and Filter */}
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={8}>
                <InputGroup>
                  <InputGroup.Text>
                    <BsSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search books, authors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Category Pills */}
        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline-secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <Row>
          {filteredBooks.map(book => (
            <Col key={book.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 book-card">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={book.cover}
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle"
                      onClick={() => toggleFavorite(book.id)}
                    >
                      {favorites.includes(book.id) ? (
                        <BsHeartFill className="text-danger" />
                      ) : (
                        <BsHeart />
                      )}
                    </Button>
                  </div>
                  <Badge 
                    bg={book.type === "audio" ? "success" : "primary"}
                    className="position-absolute top-0 start-0 m-2"
                  >
                    {getTypeIcon(book.type)} {getTypeBadge(book.type)}
                  </Badge>
                </div>
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="text-muted">{getCategoryIcon(book.category)}</span>
                    <Badge bg="secondary" className="ms-2">{book.language}</Badge>
                  </div>
                  <Card.Title className="h6 mb-2">{book.title}</Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    by {book.author}
                  </Card.Text>
                  <Card.Text className="small flex-grow-1">
                    {book.description}
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        {book.type === "audio" ? (
                          <small className="text-muted">
                            <BsPlayCircle /> {book.duration}
                          </small>
                        ) : (
                          <small className="text-muted">
                            <BsBook /> {book.pages} pages
                          </small>
                        )}
                      </div>
                      <div>
                        {book.rating && (
                          <div className="text-warning">
                            {"★".repeat(book.rating)}
                            <span className="text-muted ms-1">({book.rating})</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="primary" size="sm" className="flex-grow-1">
                        {book.type === "audio" ? <BsPlayCircle /> : <BsBook />}
                        {book.type === "audio" ? " Play" : " Read"}
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <BsDownload />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredBooks.length === 0 && (
          <Card className="text-center py-5">
            <Card.Body>
              <BsBook size={48} className="text-muted mb-3" />
              <h5>No books found</h5>
              <p className="text-muted">
                Try adjusting your search terms or category filter
              </p>
            </Card.Body>
          </Card>
        )}

        {/* Quick Stats */}
        <Card className="mt-4">
          <Card.Body>
            <div className="row text-center">
              <div className="col-3">
                <h4 className="text-primary">{books.length}</h4>
                <small className="text-muted">Total Books</small>
              </div>
              <div className="col-3">
                <h4 className="text-success">{books.filter(b => b.type === "audio").length}</h4>
                <small className="text-muted">Audio Books</small>
              </div>
              <div className="col-3">
                <h4 className="text-info">{books.filter(b => b.type === "book").length}</h4>
                <small className="text-muted">Text Books</small>
              </div>
              <div className="col-3">
                <h4 className="text-warning">{favorites.length}</h4>
                <small className="text-muted">Favorites</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </PageLayout>
  );
} 