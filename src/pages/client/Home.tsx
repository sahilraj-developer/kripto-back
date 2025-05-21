"use client"

import { useState, useRef, useEffect } from "react"
import {Link} from "react-router-dom"
import { ArrowRight, ArrowLeft, Star, Zap, Shield, Smile, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Product",
    description: "High-quality item for your needs",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90",
  },
  {
    id: 2,
    name: "Exclusive Collection",
    description: "Limited edition series",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90",
  },
  {
    id: 3,
    name: "Best Seller",
    description: "Our most popular item",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90",
  },
  {
    id: 4,
    name: "New Arrival",
    description: "Just added to our catalog",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90",
  },
  {
    id: 5,
    name: "Special Edition",
    description: "Unique design and features",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90",
  },
]

// Testimonial data
const testimonials = [
  {
    name: "John Doe",
    role: "Product Manager",
    content: "This app has transformed my workflow. It's fast, reliable, and easy to use.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jane Smith",
    role: "Designer",
    content: "The security features are top-notch. I feel very safe using this app.",
    rating: 4,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sam Johnson",
    role: "Developer",
    content: "The user interface is intuitive and makes navigation a breeze.",
    rating: 4,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [title] = useState("Discover Amazing Products")
  const [subtitle] = useState("Experience the future of shopping with our curated collection")

  // Handle Next Button Click
  const nextSlide = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to the first item
    }
  }

  // Handle Previous Button Click
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(products.length - 1) // Loop back to the last item
    }
  }

  // Auto-scroll carousel when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [currentIndex, isHovering])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-xl">{subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-200 hover:border-purple-300 shadow-sm"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img src="https://img.theweek.in/content/dam/week/news/2022/images/2022/10/20/digital-marketing-E-commerce-platform-trade-online-business--shut.jpg" alt="Hero Image" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Featured Products
            </span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full" />
          </h2>

          <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-4 md:left-0 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden mx-4 md:mx-12">
              <div
                ref={carouselRef}
                className="flex transition-all duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / Math.min(3, products.length))}%)` }}
              >
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={cn(
                      "min-w-[calc(100%/3)] px-3 transition-all duration-500",
                      "md:min-w-[calc(100%/3)]",
                      "sm:min-w-[calc(100%/2)]",
                      "min-w-[100%]",
                    )}
                  >
                    <div className="h-72 md:h-96 rounded-xl overflow-hidden group relative shadow-lg hover:shadow-xl transition-all duration-300">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                          <h3 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h3>
                          <p className="text-sm md:text-base text-gray-200 mb-4">{product.description}</p>
                          <Button
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 text-gray-800" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-purple-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Our Products
            </span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
                <img
                  src="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90"
                  alt={`Product ${item}`}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">Product Category {item}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    View All
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Key Features
            </span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Fast and Efficient</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our app processes tasks quickly and efficiently, saving you valuable time and resources.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 p-0 hover:bg-transparent hover:text-purple-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Reliable and Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Enjoy peace of mind with our reliable and secure services that protect your data.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 p-0 hover:bg-transparent hover:text-blue-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center mb-4">
                  <Smile className="h-6 w-6 text-gradient-to-r from-purple-600 to-blue-600" />
                </div>
                <CardTitle className="text-xl">User-Friendly Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our intuitive interface makes it easy for everyone to use, regardless of technical expertise.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 p-0 hover:bg-transparent hover:text-purple-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Why Choose Us?
            </span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://visionandmedia.co.uk/wp-content/uploads/2022/07/increase-Testimonials-1.png"
                alt="Premium Quality"
                width={800}
                height={600}
                className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80">
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Premium Quality</h3>
                  <p className="text-gray-200 mb-4">
                    We use only the finest materials and craftsmanship in all our products.
                  </p>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://visionandmedia.co.uk/wp-content/uploads/2022/07/increase-Testimonials-1.png"
                alt="Customer Satisfaction"
                width={800}
                height={600}
                className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80">
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Customer Satisfaction</h3>
                  <p className="text-gray-200 mb-4">Our dedicated support team ensures your complete satisfaction.</p>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              What Our Customers Say
            </span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={"" || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base italic">"{testimonial.content}"</CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Experience?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of satisfied customers and discover the difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
