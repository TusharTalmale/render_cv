// src/components/pdf/ResumePDFDocument.tsx
import { Document, Page, View, Text, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeData } from '../../lib/resumeData';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' },
  ],
});

// Create compact styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    maxWidth: '210mm',
    minHeight: '297mm',
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1A3636',
  },
  title: {
    fontSize: 14,
    color: '#677D6A',
    marginBottom: 8,
  },
  experienceText: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  contactItem: {
    fontSize: 9,
    color: '#40534C',
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A3636',
    borderBottomWidth: 1,
    borderBottomColor: '#D6BD98',
    marginBottom: 8,
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#677D6A',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A3636',
  },
  dateText: {
    fontSize: 10,
    color: '#40534C',
  },
  companyText: {
    fontSize: 12,
    color: '#677D6A',
    fontWeight: 'medium',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 10,
    color: '#40534C',
    marginBottom: 2,
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  bulletItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A3636',
  },
  skillList: {
    fontSize: 10,
    color: '#374151',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  column: {
    width: '48%',
  },
  compactItem: {
    marginBottom: 6,
  },
  icon: {
    marginRight: 4,
  },
});

const formatDateRange = (start: string, end: string) => {
  if (!start && !end) return '';
  return `${start || ''} – ${end || 'Present'}`;
};

// const calculateTotalExperience = (experience: ResumeData['experience']) => {
//   if (experience.length === 0) return null;
  
//   try {
//     const sortedExp = [...experience].sort((a, b) => 
//       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
//     );
    
//     const earliestDate = new Date(sortedExp[0].startDate);
//     const currentDate = new Date();
    
//     const diffInMonths = (currentDate.getFullYear() - earliestDate.getFullYear()) * 12 
//       + (currentDate.getMonth() - earliestDate.getMonth());
    
//     const years = Math.floor(diffInMonths / 12);
//     const months = diffInMonths % 12;
    
//     return `${years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : ''} 
//             ${months > 0 ? `${months} ${months === 1 ? 'month' : 'months'}` : ''}`.trim();
//   } catch {
//     return null;
//   }
// };

const ResumePDFDocument = ({ data }: { data: ResumeData }) => {
//   const totalExperience = calculateTotalExperience(data.experience);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.name}</Text>
{/*           
          {data.personal.title && (
            <Text style={styles.title}>{data.personal.title}</Text>
          )}
          
          {totalExperience && (
            <Text style={styles.experienceText}>
              {totalExperience} of professional experience
            </Text>
          )} */}

          <View style={styles.contactContainer}>
            {data.personal.location && (
              <View style={styles.contactItem}>
                <Text>📍 {data.personal.location}</Text>
              </View>
            )}
            {data.personal.email && (
              <Link src={`mailto:${data.personal.email}`} style={styles.contactItem}>
                ✉️ {data.personal.email}
              </Link>
            )}
            {data.personal.phone && (
              <Link src={`tel:${data.personal.phone}`} style={styles.contactItem}>
                📞 {data.personal.phone}
              </Link>
            )}
            {data.personal.website && (
              <Link 
                src={data.personal.website.startsWith('http') ? data.personal.website : `https://${data.personal.website}`} 
                style={styles.contactItem}
              >
                🔗 {data.personal.website.replace(/^https?:\/\//, '')}
              </Link>
            )}
            {data.personal.linkedin && (
              <Link 
                src={`https://linkedin.com/in/${data.personal.linkedin}`} 
                style={styles.contactItem}
              >
                💼 linkedin.com/in/{data.personal.linkedin}
              </Link>
            )}
            {data.personal.github && (
              <Link 
                src={`https://github.com/${data.personal.github}`} 
                style={styles.contactItem}
              >
                👨‍💻 github.com/{data.personal.github}
              </Link>
            )}
          </View>
        </View>

        {/* Summary Section */}
        {data.summary && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Professional Summary</Text>
            </View>
            <Text style={styles.bulletItem}>{data.summary}</Text>
          </View>
        )}

        <View style={styles.twoColumnContainer}>
          <View style={styles.column}>
            {/* Experience Section */}
            {data.experience.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <Text>Experience</Text>
                </View>
                <View style={{ gap: 8 }}>
                  {data.experience.map((exp, index) => (
                    <View key={index} style={[styles.experienceItem, styles.compactItem]}>
                      <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{exp.title}</Text>
                        <Text style={styles.dateText}>
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </Text>
                      </View>
                      <Text style={styles.companyText}>{exp.company}</Text>
                      {exp.location && (
                        <Text style={styles.locationText}>📍 {exp.location}</Text>
                      )}
                      {exp.description && (
                        <View style={styles.bulletList}>
                          {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                            <Text key={i} style={styles.bulletItem}>• {line}</Text>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Education Section */}
            {data.education.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <Text>Education</Text>
                </View>
                <View style={{ gap: 8 }}>
                  {data.education.map((edu, index) => (
                    <View key={index} style={[styles.experienceItem, styles.compactItem]}>
                      <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{edu.university}</Text>
                        <Text style={styles.dateText}>
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </Text>
                      </View>
                      <Text style={styles.companyText}>{edu.degree}</Text>
                      {edu.gpa && (
                        <Text style={styles.bulletItem}>
                          <Text style={{ fontWeight: 'bold' }}>GPA:</Text> {edu.gpa}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={styles.column}>
            {/* Skills Section */}
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <Text>Skills</Text>
                </View>
                <View style={styles.skillsContainer}>
                  {data.skills.map((skillCat, index) => (
                    <View key={index} style={{ marginBottom: 6 }}>
                      <Text style={styles.skillCategory}>{skillCat.category}</Text>
                      <Text style={styles.skillList}>{skillCat.list}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Projects Section */}
            {data.projects.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <Text>Projects</Text>
                </View>
                <View style={{ gap: 8 }}>
                  {data.projects.map((proj, index) => (
                    <View key={index} style={[styles.experienceItem, styles.compactItem]}>
                      <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{proj.title}</Text>
                        {proj.link && (
                          <Link 
                            src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                            style={styles.dateText}
                          >
                            🔗 Link
                          </Link>
                        )}
                      </View>
                      {proj.description && (
                        <Text style={styles.bulletItem}>{proj.description}</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Awards Section */}
            {data.awards.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <Text>Awards & Honors</Text>
                </View>
                <View style={{ gap: 8 }}>
                  {data.awards.map((award, index) => (
                    <View key={index} style={[styles.experienceItem, styles.compactItem]}>
                      <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{award.name}</Text>
                        <Text style={styles.dateText}>{award.year}</Text>
                      </View>
                      {/* {award.issuer && (
                        <Text style={styles.companyText}>{award.issuer}</Text>
                      )} */}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications Section */}
            {data.certifications.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <Text>Certifications</Text>
                </View>
                <View style={{ gap: 8 }}>
                  {data.certifications.map((cert, index) => (
                    <View key={index} style={[styles.experienceItem, styles.compactItem]}>
                      <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{cert.name}</Text>
                        <Text style={styles.dateText}>{cert.date}</Text>
                      </View>
                      <Text style={styles.companyText}>{cert.issuer}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFDocument;