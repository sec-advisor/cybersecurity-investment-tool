import { SegmentDefinition } from '@app/api-interfaces';

export const segmentDatabase: SegmentDefinition[] = [
  {
    key: 'database',
    description: 'Database',
    valueEstimation: {
      inputs: [
        { key: 'customer', description: 'Number of Customer PII', type: 'number' },
        { key: 'anonymized_customer', description: 'Number of Anonymized Customer Data', type: 'number' },
        { key: 'employee', description: 'Number of Employee PII', type: 'number' },
        { key: 'intellectual_property', description: 'Number of Intellectual Property', type: 'number' },
        { key: 'other_data', description: 'Number of Other corporate data', type: 'number' },
      ],
      calculation: 'customer * 157 + anonymized_customer * 153 + employee * 163 + intellectual_property * 151 + other_data * 150'
    }
  },
  {
    key: 'database2',
    description: 'Database2',
    valueEstimation: {
      inputs: [
        { key: 'customer', description: 'Number of Customer PII', type: 'number' },
        { key: 'anonymized_customer', description: 'Number of Anonymized Customer Data', type: 'number' },
        { key: 'employee', description: 'Number of Employee PII', type: 'number' },
        { key: 'intellectual_property', description: 'Number of Intellectual Property', type: 'number' },
        { key: 'other_data', description: 'Number of Other corporate data', type: 'number' },
      ],
      calculation: 'customer * 157 + anonymized_customer * 153 + employee * 163 + intellectual_property * 151 + other_data * 150'
    }
  }
]
