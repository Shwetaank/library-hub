export interface Testimonial {
  id: number;
  name: string;
  role: string;
  institution: string;
  message: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Riya Sharma",
    role: "Head Librarian",
    institution: "Delhi Public School, Delhi",
    message:
      "We reduced manual work by 60% within the first month. The automation and tracking system is incredibly efficient.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 2,
    name: "Amit Kulkarni",
    role: "IT Administrator",
    institution: "Fergusson College, Pune",
    message:
      "Integration with Azure SQL made our data secure and scalable. The system handles thousands of books smoothly.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Sneha Iyer",
    role: "Library Coordinator",
    institution: "Anna University, Chennai",
    message:
      "Students love the digital dashboard and real-time availability tracking.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Principal",
    institution: "St. Xavier’s School, Mumbai",
    message:
      "Borrow workflow automation has transformed our library operations.",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Head Librarian",
    institution: "Christ University, Bengaluru",
    message:
      "The role-based access system ensures complete control and transparency.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Director",
    institution: "IIT Kanpur",
    message:
      "Performance is outstanding even with large datasets and multiple users.",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 7,
    name: "Neha Gupta",
    role: "Academic Coordinator",
    institution: "Amity University, Noida",
    message: "Our digital transformation journey started with this platform.",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    id: 8,
    name: "Arjun Mehta",
    role: "System Admin",
    institution: "BITS Pilani",
    message: "Seamless integration and smooth deployment process.",
    avatar: "https://i.pravatar.cc/150?img=30",
  },
  {
    id: 9,
    name: "Kavya Reddy",
    role: "Library Head",
    institution: "Osmania University, Hyderabad",
    message: "User-friendly interface and excellent support team.",
    avatar: "https://i.pravatar.cc/150?img=41",
  },
  {
    id: 10,
    name: "Manish Patil",
    role: "Principal",
    institution: "Nagpur Public School, Nagpur",
    message: "Perfect solution for Indian educational institutions.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];
