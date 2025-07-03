import React from 'react';
import { Input } from './Input';
import { User, Mail, Phone, MapPin, Link as LinkIcon, Linkedin, Github } from 'lucide-react';

export const PersonalInformationForm = ({ personalData, onPersonalChange }) => {
  return (
    <>
      <Input
        label="Full Name"
        name="name"
        value={personalData.name}
        onChange={onPersonalChange}
        icon={<User size={18} className="text-[#677D6A]" />}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          value={personalData.email}
          onChange={onPersonalChange}
          icon={<Mail size={18} className="text-[#677D6A]" />}
        />
        <Input
          label="Phone"
          name="phone"
          value={personalData.phone}
          onChange={onPersonalChange}
          icon={<Phone size={18} className="text-[#677D6A]" />}
        />
      </div>
      <Input
        label="Location"
        name="location"
        value={personalData.location}
        onChange={onPersonalChange}
        icon={<MapPin size={18} className="text-[#677D6A]" />}
      />
      <Input
        label="Website"
        name="website"
        value={personalData.website}
        onChange={onPersonalChange}
        icon={<LinkIcon size={18} className="text-[#677D6A]" />}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="LinkedIn Username"
          name="linkedin"
          value={personalData.linkedin}
          onChange={onPersonalChange}
          icon={<Linkedin size={18} className="text-[#677D6A]" />}
        />
        <Input
          label="GitHub Username"
          name="github"
          value={personalData.github}
          onChange={onPersonalChange}
          icon={<Github size={18} className="text-[#677D6A]" />}
        />
      </div>
    </>
  );
};