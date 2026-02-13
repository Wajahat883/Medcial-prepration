/**
 * Shared Constants for AMC MCQ Exam Preparation Platform
 * Used by both client and server
 */

import { ISubscriptionPlan, ISubject, DifficultyLevel, QuestionType, TestMode, TestType } from '../types';

// ============================================================================
// Subjects & Medical Topics
// ============================================================================

export const SUBJECTS: ISubject[] = [
  {
    name: 'Medicine',
    description: 'Internal Medicine including all medical subspecialties',
    displayOrder: 1,
    color: '#3B82F6',
    isActive: true,
    topics: [
      {
        name: 'Cardiology',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Heart Failure', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Arrhythmias', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Valvular Heart Disease', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Coronary Artery Disease', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Hypertension', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'ECG Interpretation', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Congenital Heart Disease', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Pericardial Diseases', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Infective Endocarditis', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Cardiomyopathies', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Respiratory Medicine',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Asthma', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'COPD', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Pneumonia', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Tuberculosis', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Lung Cancer', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Pulmonary Embolism', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Interstitial Lung Disease', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Pleural Diseases', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Sleep Apnea', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Respiratory Failure', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Gastroenterology',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'GERD', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Peptic Ulcer Disease', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Inflammatory Bowel Disease', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Liver Diseases', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Pancreatitis', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Colorectal Cancer', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Malabsorption', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Irritable Bowel Syndrome', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Hepatitis', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'GI Bleeding', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Nephrology',
        subjectId: '',
        displayOrder: 4,
        isActive: true,
        subtopics: [
          { name: 'Chronic Kidney Disease', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Acute Kidney Injury', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Glomerulonephritis', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Nephrotic Syndrome', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Urinary Tract Infection', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Electrolyte Disorders', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Acid-Base Disorders', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Renal Tubular Disorders', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Polycystic Kidney Disease', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Diabetic Nephropathy', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Endocrinology',
        subjectId: '',
        displayOrder: 5,
        isActive: true,
        subtopics: [
          { name: 'Diabetes Mellitus', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Thyroid Disorders', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Adrenal Disorders', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Pituitary Disorders', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Calcium Disorders', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'PCOS', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Osteoporosis', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Dyslipidemia', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Metabolic Syndrome', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Hypoglycemia', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Neurology',
        subjectId: '',
        displayOrder: 6,
        isActive: true,
        subtopics: [
          { name: 'Stroke', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Seizures & Epilepsy', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Headache', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Parkinson Disease', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Multiple Sclerosis', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Dementia', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Neuropathy', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Myasthenia Gravis', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Meningitis', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Gullain-Barre Syndrome', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Rheumatology',
        subjectId: '',
        displayOrder: 7,
        isActive: true,
        subtopics: [
          { name: 'Rheumatoid Arthritis', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Systemic Lupus Erythematosus', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Osteoarthritis', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Gout', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Spondyloarthropathies', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Systemic Sclerosis', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Vasculitis', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Sjogren Syndrome', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Polymyalgia Rheumatica', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Temporal Arteritis', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Dermatology',
        subjectId: '',
        displayOrder: 8,
        isActive: true,
        subtopics: [
          { name: 'Psoriasis', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Eczema', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Acne', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Skin Cancer', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Drug Eruptions', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Infections', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Bullous Diseases', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Vasculitis', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Hair Disorders', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Nail Disorders', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Hematology',
        subjectId: '',
        displayOrder: 9,
        isActive: true,
        subtopics: [
          { name: 'Anemia', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Leukemia', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Lymphoma', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Coagulation Disorders', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Myeloproliferative Disorders', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Bleeding Disorders', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Thrombocytopenia', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Hemoglobinopathies', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Transfusion Medicine', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Plasma Cell Disorders', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Infectious Diseases',
        subjectId: '',
        displayOrder: 10,
        isActive: true,
        subtopics: [
          { name: 'HIV/AIDS', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Sepsis', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Malaria', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Tuberculosis', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Infective Endocarditis', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Meningitis', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Cellulitis', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Osteomyelitis', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Travel Medicine', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Antibiotic Stewardship', subjectId: '', displayOrder: 10, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Surgery',
    description: 'General Surgery and Surgical Specialties',
    displayOrder: 2,
    color: '#EF4444',
    isActive: true,
    topics: [
      {
        name: 'General Surgery',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Acute Abdomen', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Appendicitis', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Gallbladder Disease', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Hernias', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Bowel Obstruction', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'GI Bleeding', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Peritonitis', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Abdominal Trauma', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Breast Surgery', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Thyroid Surgery', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Orthopedics',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Fractures', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Joint Replacement', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Low Back Pain', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Osteoarthritis', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Osteomyelitis', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Bone Tumors', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Sports Injuries', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Pediatric Orthopedics', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Hand Surgery', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Spine Disorders', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Neurosurgery',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'Head Injury', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Spinal Cord Injury', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Brain Tumors', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Hydrocephalus', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Subarachnoid Hemorrhage', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'CNS Infections', subjectId: '', displayOrder: 6, isActive: true }
        ]
      },
      {
        name: 'Cardiothoracic Surgery',
        subjectId: '',
        displayOrder: 4,
        isActive: true,
        subtopics: [
          { name: 'CABG', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Valve Surgery', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Lung Cancer Surgery', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Thoracic Trauma', subjectId: '', displayOrder: 4, isActive: true }
        ]
      },
      {
        name: 'Vascular Surgery',
        subjectId: '',
        displayOrder: 5,
        isActive: true,
        subtopics: [
          { name: 'Aortic Aneurysm', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Peripheral Artery Disease', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Deep Vein Thrombosis', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Varicose Veins', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Lymphedema', subjectId: '', displayOrder: 5, isActive: true }
        ]
      },
      {
        name: 'Urology',
        subjectId: '',
        displayOrder: 6,
        isActive: true,
        subtopics: [
          { name: 'Urinary Tract Stones', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Prostate Disease', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Bladder Cancer', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Renal Cancer', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Testicular Disorders', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Urinary Incontinence', subjectId: '', displayOrder: 6, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Obstetrics & Gynecology',
    description: 'Women\'s health, pregnancy, and reproductive medicine',
    displayOrder: 3,
    color: '#EC4899',
    isActive: true,
    topics: [
      {
        name: 'Obstetrics',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Normal Pregnancy', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Antenatal Care', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Labor and Delivery', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Postpartum Care', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Hypertensive Disorders', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Gestational Diabetes', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Fetal Growth Disorders', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Multiple Pregnancy', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Preterm Labor', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Antepartum Hemorrhage', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Gynecology',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Menstrual Disorders', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Endometriosis', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Uterine Fibroids', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Ovarian Cysts', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'PCOS', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Cervical Cancer', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Endometrial Cancer', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Ovarian Cancer', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Pelvic Inflammatory Disease', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Vaginal Infections', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Family Planning',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'Contraception', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Infertility', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Menopause', subjectId: '', displayOrder: 3, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Pediatrics',
    description: 'Child health from newborn to adolescence',
    displayOrder: 4,
    color: '#F59E0B',
    isActive: true,
    topics: [
      {
        name: 'Neonatology',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Newborn Examination', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Neonatal Jaundice', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Respiratory Distress', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Neonatal Infections', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Prematurity', subjectId: '', displayOrder: 5, isActive: true }
        ]
      },
      {
        name: 'Pediatric Medicine',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Growth and Development', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Nutrition', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Immunization', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Febrile Child', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Respiratory Infections', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Diarrhea and Dehydration', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Seizures', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Pediatric Rash', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Congenital Anomalies', subjectId: '', displayOrder: 9, isActive: true },
          { name: 'Genetic Disorders', subjectId: '', displayOrder: 10, isActive: true }
        ]
      },
      {
        name: 'Pediatric Emergencies',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'Acute Asthma', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Anaphylaxis', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Poisoning', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Trauma', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Sepsis', subjectId: '', displayOrder: 5, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Psychiatry',
    description: 'Mental health and behavioral disorders',
    displayOrder: 5,
    color: '#8B5CF6',
    isActive: true,
    topics: [
      {
        name: 'Mood Disorders',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Major Depression', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Bipolar Disorder', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Dysthymia', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Postpartum Depression', subjectId: '', displayOrder: 4, isActive: true }
        ]
      },
      {
        name: 'Anxiety Disorders',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Generalized Anxiety', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Panic Disorder', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Phobias', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'OCD', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'PTSD', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Social Anxiety', subjectId: '', displayOrder: 6, isActive: true }
        ]
      },
      {
        name: 'Psychotic Disorders',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'Schizophrenia', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Delusional Disorder', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Brief Psychotic Disorder', subjectId: '', displayOrder: 3, isActive: true }
        ]
      },
      {
        name: 'Other Disorders',
        subjectId: '',
        displayOrder: 4,
        isActive: true,
        subtopics: [
          { name: 'Personality Disorders', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Eating Disorders', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Substance Abuse', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'ADHD', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Autism Spectrum', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Sleep Disorders', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Suicide and Self-harm', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Consultation-Liaison', subjectId: '', displayOrder: 8, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Emergency Medicine',
    description: 'Acute care and emergency management',
    displayOrder: 6,
    color: '#DC2626',
    isActive: true,
    topics: [
      {
        name: 'Cardiovascular Emergencies',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Acute MI', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Cardiac Arrest', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Heart Failure', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Aortic Dissection', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Hypertensive Emergency', subjectId: '', displayOrder: 5, isActive: true }
        ]
      },
      {
        name: 'Trauma',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'ATLS Principles', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Head Trauma', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Chest Trauma', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Abdominal Trauma', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Spinal Trauma', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Burns', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Polytrauma', subjectId: '', displayOrder: 7, isActive: true }
        ]
      },
      {
        name: 'Medical Emergencies',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'Anaphylaxis', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Sepsis', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'DKA', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Thyroid Storm', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Electrolyte Emergencies', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Poisoning', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Environmental Emergencies', subjectId: '', displayOrder: 7, isActive: true }
        ]
      },
      {
        name: 'Respiratory Emergencies',
        subjectId: '',
        displayOrder: 4,
        isActive: true,
        subtopics: [
          { name: 'Airway Management', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Asthma Exacerbation', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'COPD Exacerbation', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Pulmonary Edema', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Pneumothorax', subjectId: '', displayOrder: 5, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Public Health',
    description: 'Community medicine and preventive health',
    displayOrder: 7,
    color: '#10B981',
    isActive: true,
    topics: [
      {
        name: 'Epidemiology',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Study Designs', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Measures of Disease', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Screening Tests', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Outbreak Investigation', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Biostatistics', subjectId: '', displayOrder: 5, isActive: true }
        ]
      },
      {
        name: 'Preventive Medicine',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Immunization', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Health Promotion', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Disease Prevention', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Screening Programs', subjectId: '', displayOrder: 4, isActive: true }
        ]
      },
      {
        name: 'Community Health',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'Healthcare Systems', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Health Equity', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Aboriginal Health', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Occupational Health', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Environmental Health', subjectId: '', displayOrder: 5, isActive: true }
        ]
      }
    ]
  },
  {
    name: 'Basic Sciences',
    description: 'Foundational medical sciences',
    displayOrder: 8,
    color: '#6366F1',
    isActive: true,
    topics: [
      {
        name: 'Anatomy',
        subjectId: '',
        displayOrder: 1,
        isActive: true,
        subtopics: [
          { name: 'Gross Anatomy', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Embryology', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Histology', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Neuroanatomy', subjectId: '', displayOrder: 4, isActive: true }
        ]
      },
      {
        name: 'Physiology',
        subjectId: '',
        displayOrder: 2,
        isActive: true,
        subtopics: [
          { name: 'Cardiovascular Physiology', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Respiratory Physiology', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Renal Physiology', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'GI Physiology', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Endocrine Physiology', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'Neurophysiology', subjectId: '', displayOrder: 6, isActive: true }
        ]
      },
      {
        name: 'Pathology',
        subjectId: '',
        displayOrder: 3,
        isActive: true,
        subtopics: [
          { name: 'General Pathology', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Systemic Pathology', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Hematopathology', subjectId: '', displayOrder: 3, isActive: true }
        ]
      },
      {
        name: 'Pharmacology',
        subjectId: '',
        displayOrder: 4,
        isActive: true,
        subtopics: [
          { name: 'Pharmacokinetics', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Pharmacodynamics', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Autonomic Pharmacology', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Cardiovascular Drugs', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Antibiotics', subjectId: '', displayOrder: 5, isActive: true },
          { name: 'CNS Drugs', subjectId: '', displayOrder: 6, isActive: true },
          { name: 'Analgesics', subjectId: '', displayOrder: 7, isActive: true },
          { name: 'Drug Interactions', subjectId: '', displayOrder: 8, isActive: true },
          { name: 'Adverse Drug Reactions', subjectId: '', displayOrder: 9, isActive: true }
        ]
      },
      {
        name: 'Microbiology',
        subjectId: '',
        displayOrder: 5,
        isActive: true,
        subtopics: [
          { name: 'Bacteriology', subjectId: '', displayOrder: 1, isActive: true },
          { name: 'Virology', subjectId: '', displayOrder: 2, isActive: true },
          { name: 'Mycology', subjectId: '', displayOrder: 3, isActive: true },
          { name: 'Parasitology', subjectId: '', displayOrder: 4, isActive: true },
          { name: 'Immunology', subjectId: '', displayOrder: 5, isActive: true }
        ]
      }
    ]
  }
];

// ============================================================================
// Difficulty Levels
// ============================================================================

export const DIFFICULTY_LEVELS: { value: DifficultyLevel; label: string; color: string }[] = [
  { value: 'easy', label: 'Easy', color: '#22C55E' },
  { value: 'medium', label: 'Medium', color: '#F59E0B' },
  { value: 'hard', label: 'Hard', color: '#EF4444' }
];

// ============================================================================
// Question Types
// ============================================================================

export const QUESTION_TYPES: { value: QuestionType; label: string; description: string }[] = [
  { value: 'single_best_answer', label: 'Single Best Answer', description: 'Standard MCQ with one correct answer' },
  { value: 'clinical_vignette', label: 'Clinical Vignette', description: 'Case-based clinical scenario' },
  { value: 'image_based', label: 'Image Based', description: 'Question with diagnostic images' },
  { value: 'ecg_interpretation', label: 'ECG Interpretation', description: 'ECG reading and diagnosis' },
  { value: 'lab_interpretation', label: 'Lab Interpretation', description: 'Laboratory results analysis' },
  { value: 'drug_selection', label: 'Drug Selection', description: 'Pharmacology and therapeutics' },
  { value: 'diagnosis', label: 'Diagnosis', description: 'Most likely diagnosis questions' },
  { value: 'management', label: 'Management', description: 'Next step in management' }
];

// ============================================================================
// Test Types
// ============================================================================

export const TEST_TYPES: { value: TestType; label: string; description: string; questionCount: number; timeLimit: number }[] = [
  { value: 'custom', label: 'Custom Test', description: 'Create your own test with selected subjects', questionCount: 0, timeLimit: 0 },
  { value: 'mock_full', label: 'Full Mock Exam', description: 'Complete 150-question AMC-style exam', questionCount: 150, timeLimit: 210 },
  { value: 'mock_half', label: 'Half Mock Exam', description: '75-question practice exam', questionCount: 75, timeLimit: 105 },
  { value: 'mock_subject', label: 'Subject Mock', description: '50-questions per subject', questionCount: 50, timeLimit: 70 },
  { value: 'mock_rapid', label: 'Rapid Review', description: 'Quick 30-question test', questionCount: 30, timeLimit: 45 },
  { value: 'quick_quiz', label: 'Quick Quiz', description: '10-20 random questions', questionCount: 15, timeLimit: 20 }
];

// ============================================================================
// Test Modes
// ============================================================================

export const TEST_MODES: { value: TestMode; label: string; description: string }[] = [
  { value: 'tutor', label: 'Tutor Mode', description: 'Learn with immediate feedback and explanations' },
  { value: 'timed', label: 'Timed Mode', description: 'Practice under exam conditions with timer' },
  { value: 'practice_test', label: 'Practice Test', description: 'Simulated exam without immediate feedback' },
  { value: 'quick_quiz', label: 'Quick Quiz', description: 'Short quiz for quick practice' },
  { value: 'review', label: 'Review Mode', description: 'Review previously attempted questions' }
];

// ============================================================================
// Subscription Plans
// ============================================================================

export const SUBSCRIPTION_PLANS: Omit<ISubscriptionPlan, '_id' | 'id'>[] = [
  {
    name: 'Free Trial',
    description: 'Try before you subscribe - Limited access',
    durationDays: 7,
    priceAUD: 0,
    features: [
      'Access to 50 questions',
      'Basic analytics',
      'Limited explanations',
      '1 mock exam',
      'Community forum read-only'
    ],
    isActive: true,
    displayOrder: 1
  },
  {
    name: 'Monthly',
    description: 'Full access with monthly billing',
    durationDays: 30,
    priceAUD: 49,
    features: [
      'Unlimited question access',
      'Advanced analytics dashboard',
      'Full detailed explanations',
      'Unlimited mock exams',
      'Performance predictions',
      'Notes & bookmarks',
      'Discussion forum access',
      'Mobile app access',
      'Cancel anytime'
    ],
    isActive: true,
    displayOrder: 2
  },
  {
    name: 'Quarterly',
    description: 'Save 10% with quarterly billing',
    durationDays: 90,
    priceAUD: 129,
    features: [
      'Everything in Monthly plan',
      '10% discount',
      'Priority support',
      'Study planner access',
      'Downloadable reports'
    ],
    isActive: true,
    displayOrder: 3
  },
  {
    name: '6-Month Plan',
    description: 'Save 20% with half-yearly billing',
    durationDays: 180,
    priceAUD: 229,
    features: [
      'Everything in Quarterly plan',
      '20% discount',
      'Offline mode',
      'Expert Q&A access',
      'Personalized study plan'
    ],
    isActive: true,
    displayOrder: 4
  },
  {
    name: 'Annual',
    description: 'Best value - Save 30% with yearly billing',
    durationDays: 365,
    priceAUD: 399,
    features: [
      'Everything in 6-Month plan',
      '30% discount (Best Value)',
      '1-on-1 study consultation',
      'Early access to new features',
      'Certificate of completion',
      'Resume builder assistance'
    ],
    isActive: true,
    displayOrder: 5
  }
];

// ============================================================================
// Exam Information
// ============================================================================

export const AMC_EXAM_INFO = {
  name: 'AMC CAT MCQ Examination',
  fullName: 'Australian Medical Council Computer Adaptive Test Multiple Choice Question Examination',
  format: 'Computer Adaptive Test (CAT)',
  duration: 210, // minutes
  totalQuestions: 150,
  optionsPerQuestion: 5,
  scoringScale: { min: 0, max: 500 },
  passMark: 250,
  delivery: 'Pearson VUE test centers',
  validityPeriod: 'Valid indefinitely (though some employers may require recent completion)'
};

// ============================================================================
// Common Tags
// ============================================================================

export const COMMON_TAGS = [
  'high-yield',
  'image-based',
  'must-know',
  'amc-recall',
  'clinical-pearl',
  'common-presentation',
  'emergency',
  'pediatric-focus',
  'geriatic-focus',
  'recent-update'
];

// ============================================================================
// Reference Textbooks
// ============================================================================

export const REFERENCE_BOOKS = [
  "Kumar and Clark's Clinical Medicine, 10th Edition",
  "Davidson's Principles and Practice of Medicine, 24th Edition",
  "Harrison's Principles of Internal Medicine, 21st Edition",
  "Schwartz's Principles of Surgery, 11th Edition",
  "Williams Obstetrics, 25th Edition",
  "Nelson Textbook of Pediatrics, 21st Edition",
  "Goodman & Gilman's The Pharmacological Basis of Therapeutics, 13th Edition",
  "Robbins Basic Pathology, 10th Edition",
  "Gray's Anatomy for Students, 4th Edition",
  "ECG Made Easy, 8th Edition",
  "Oxford Handbook of Clinical Medicine, 10th Edition",
  "Talley and O'Connor Clinical Examination, 8th Edition",
  "Basic and Clinical Pharmacology, 14th Edition (Katzung)",
  "Current Medical Diagnosis and Treatment 2024",
  "UpToDate Clinical Decision Support",
  "Therapeutic Guidelines: Antibiotic, Version 17",
  "RACGP Guidelines",
  "AMC MCQ Handbook"
];
