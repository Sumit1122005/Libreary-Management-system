-- Sample data for Library Management System

-- Insert sample users
INSERT INTO users (email, password_hash, role, full_name) VALUES
('admin@college.edu', '$2b$10$example_hash_admin', 'admin', 'System Administrator'),
('librarian@college.edu', '$2b$10$example_hash_librarian', 'librarian', 'Head Librarian'),
('student1@college.edu', '$2b$10$example_hash_student1', 'student', 'Rahul Sharma'),
('student2@college.edu', '$2b$10$example_hash_student2', 'student', 'Priya Patel');

-- Insert sample students
INSERT INTO students (student_id, full_name, email, phone, course, year_of_study, address) VALUES
('CS2021001', 'Rahul Sharma', 'rahul.sharma@college.edu', '+91-9876543210', 'Computer Science', 3, 'Hostel Block A, Room 201'),
('CS2021002', 'Priya Patel', 'priya.patel@college.edu', '+91-9876543211', 'Computer Science', 3, 'Hostel Block B, Room 105'),
('ME2022001', 'Arjun Kumar', 'arjun.kumar@college.edu', '+91-9876543212', 'Mechanical Engineering', 2, 'Hostel Block C, Room 301'),
('EC2020001', 'Sneha Reddy', 'sneha.reddy@college.edu', '+91-9876543213', 'Electronics', 4, 'Day Scholar');

-- Insert sample books
INSERT INTO books (isbn, title, author, publisher, publication_year, category, subject, total_copies, available_copies, location) VALUES
('978-0132350884', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'Prentice Hall', 2008, 'Programming', 'Computer Science', 3, 2, 'Section A, Shelf 12'),
('978-0201633610', 'Design Patterns: Elements of Reusable Object-Oriented Software', 'Gang of Four', 'Addison-Wesley', 1994, 'Programming', 'Computer Science', 2, 1, 'Section A, Shelf 15'),
('978-0134685991', 'Effective Java', 'Joshua Bloch', 'Addison-Wesley', 2017, 'Programming', 'Computer Science', 4, 4, 'Section A, Shelf 10'),
('978-0262033848', 'Introduction to Algorithms', 'Thomas H. Cormen', 'MIT Press', 2009, 'Algorithms', 'Computer Science', 5, 3, 'Section A, Shelf 8'),
('978-0073523323', 'Database System Concepts', 'Abraham Silberschatz', 'McGraw-Hill', 2019, 'Database', 'Computer Science', 3, 2, 'Section A, Shelf 20'),
('978-0134092669', 'Computer Networks: A Top-Down Approach', 'James Kurose', 'Pearson', 2016, 'Networks', 'Computer Science', 2, 1, 'Section A, Shelf 25'),
('978-0071244565', 'Engineering Mechanics: Statics', 'J.L. Meriam', 'McGraw-Hill', 2015, 'Mechanics', 'Mechanical Engineering', 4, 3, 'Section B, Shelf 5'),
('978-0134444321', 'Electronic Devices and Circuit Theory', 'Robert Boylestad', 'Pearson', 2018, 'Electronics', 'Electronics', 3, 2, 'Section C, Shelf 10');

-- Insert sample issued books
INSERT INTO issued_books (book_id, student_id, issue_date, due_date, status, issued_by) VALUES
(1, 1, '2024-01-15', '2024-02-15', 'issued', 2),
(4, 2, '2024-01-20', '2024-02-20', 'issued', 2),
(2, 3, '2024-01-10', '2024-02-10', 'overdue', 2),
(5, 1, '2024-01-25', '2024-02-25', 'issued', 2);

-- Update available copies based on issued books
UPDATE books SET available_copies = total_copies - (
    SELECT COUNT(*) FROM issued_books 
    WHERE issued_books.book_id = books.id 
    AND issued_books.status IN ('issued', 'overdue')
);
