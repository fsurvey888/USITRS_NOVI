-- Tabela za Vijesti
CREATE TABLE IF NOT EXISTS vijesti (
  id BIGINT PRIMARY KEY DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  date VARCHAR(50) NOT NULL,
  dateSort BIGINT NOT NULL,
  category VARCHAR(100) NOT NULL,
  categoryLabel VARCHAR(100) NOT NULL,
  image TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  contentHtml TEXT,
  gallery TEXT[], -- JSON array of URLs
  comments INT DEFAULT 0,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela za Zanimljivosti
CREATE TABLE IF NOT EXISTS zanimljivosti (
  id BIGINT PRIMARY KEY DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  title VARCHAR(255) NOT NULL,
  fact TEXT NOT NULL,
  date VARCHAR(50) NOT NULL,
  dateSort BIGINT NOT NULL,
  category VARCHAR(100) NOT NULL,
  categoryLabel VARCHAR(100) NOT NULL,
  image TEXT,
  icon VARCHAR(100),
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela za Dokumente
CREATE TABLE IF NOT EXISTS dokumenti (
  id BIGINT PRIMARY KEY DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- 'pdf', 'doc', etc
  url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  categoryLabel VARCHAR(100) NOT NULL,
  uploadDate VARCHAR(50) NOT NULL,
  size VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kreiraj indekse za brže pretraživanje
CREATE INDEX idx_vijesti_dateSort ON vijesti(dateSort DESC);
CREATE INDEX idx_vijesti_slug ON vijesti(slug);
CREATE INDEX idx_zanimljivosti_dateSort ON zanimljivosti(dateSort DESC);
CREATE INDEX idx_zanimljivosti_slug ON zanimljivosti(slug);
CREATE INDEX idx_dokumenti_category ON dokumenti(category);
