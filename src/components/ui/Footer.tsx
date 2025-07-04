import React from 'react';
import { FileText, Github, Linkedin, Mail, Coffee } from 'lucide-react'; // Import necessary icons

export default function UpdatedFooter() {
  return (
    <footer className="bg-[#1A3636] text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          {/* Brand Info */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2 text-[#D6BD98]">
              <FileText className="text-[#D6BD98]" size={28} />
              RenderCV
            </h3>
            <p className="text-[#D6BD98] mt-2 text-md">Create professional LaTeX resumes with ease.</p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-xl font-semibold mb-3 text-[#D6BD98]">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#D6BD98] transition text-sm">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D6BD98] transition text-sm">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D6BD98] transition text-sm">Support</a></li>
            </ul>
          </div>

          {/* Connect with the Creator */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-3 text-[#D6BD98]">Connect with the Creator</h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Github size={20} className="text-[#D6BD98]" />
                <a href="https://github.com/TusharTalmale/render_cv" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6BD98] transition text-sm">
                  Project GitHub
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Github size={20} className="text-[#D6BD98]" />
                <a href="https://github.com/TusharTalmale" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6BD98] transition text-sm">
                  GitHub Profile
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Linkedin size={20} className="text-[#D6BD98]" />
                <a href="https://www.linkedin.com/in/tushartalmale" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6BD98] transition text-sm">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={20} className="text-[#D6BD98]" />
                <a href="mailto:tushar.talmale8@gmail.com" className="hover:text-[#D6BD98] transition text-sm">
                  tushar.talmale8@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Coffee size={20} className="text-[#D6BD98]" />
                <a href="https://buymeacoffee.com/tushartalmale" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6BD98] transition text-sm">
                  Buy Me a Coffee
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                {/* No specific icon for portfolio, using a link icon or similar if desired */}
                <span className="text-[#D6BD98] text-sm">🔗</span>
                <a href="https://my-portfolio-nextjs-wheat.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6BD98] transition text-sm">
                  My Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#40534C] mt-6 pt-6 text-center text-sm text-[#D6BD98]">
          © {new Date().getFullYear()} RenderCV. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
