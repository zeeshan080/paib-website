import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";

export default function ContactPage() {
  return (
    <MainLayout>
      
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to transform your business with AI? Get in touch with our
              team of experts and let's discuss how we can help you achieve your
              goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-400" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">info@paib.gov.pk</p>
                  <p className="text-slate-300">support@paib.gov.pk</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-teal-400" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">+92 51 123 4567</p>
                  <p className="text-slate-300">+92 51 765 4321</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Visit Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Pakistan Artificial Intelligence Builders
                    <br />
                    Constitution Avenue
                    <br />
                    Islamabad, Pakistan
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Send us a Message
                  </CardTitle>
                  <p className="text-slate-300">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white">Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Interactive Map Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
    
    </MainLayout>
  );
}
