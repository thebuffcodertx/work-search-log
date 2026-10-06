CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE work_searches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  activity_type ENUM('Application','Interview Prep','Job Fair','Networking','Workshop/Training','Other') NOT NULL DEFAULT 'Application',
  activity_date DATE NOT NULL,
  company_name VARCHAR(150),
  job_title VARCHAR(150),
  job_url VARCHAR(500),
  platform ENUM('LinkedIn','Indeed','ZipRecruiter','Company Website','Referral','Job Fair','Other'),
  work_type ENUM('Remote','Hybrid','On-site'),
  location VARCHAR(150),
  contact_name VARCHAR(100),
  contact_email VARCHAR(255),
  status ENUM('Interested','Applied','Screening','Interview','Offer','Rejected','Withdrawn'),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_work_searches_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_date (user_id, activity_date),
  INDEX idx_user_status (user_id, status),
  INDEX idx_user_title (user_id, job_title)
);