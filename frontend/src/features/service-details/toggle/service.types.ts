export type  OperatingStatus= 'closed' | 'open' | 'unknown'
export type ServiceCategory = 'clinic' | 'school' | 'library' | 'policestation' | 'firestation'| 'hospital'| 'home affairs' | 'Shelter' |'dentist' |'pharmacy' | 'other';


export interface Services{
    id:string;
    name: string;
  address?: string;              
  category: ServiceCategory;
  coordinates?: {
    latitude: number;
    longitude: number;

},
latitude: number;             
  longitude: number;
  openingHours?: string | null; 
  wheelchair?: string;            
  source: string;  
  website?: string;
  submittedBy?: string; 
phone?: string;  }

export interface ServiceWithStatus extends Services {
    status: OperatingStatus;
}