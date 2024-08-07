import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ServiceType {
  nombre: string;
  precio: number;
}

interface Service {
  [key: string]: {
    tipos: ServiceType[];
  };
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  services: { name: string, tipos: ServiceType[] }[] = [];
  selectedServiceTypes: ServiceType[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      serviceCategory: ['', Validators.required],
      serviceType: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.http.get<Service[]>('http://localhost:3000/api/services').subscribe(
      (data) => {
        this.services = data.map(service => {
          const name = Object.keys(service).find(key => key !== '_id');
          if (name) {
            return {
              name: name,
              tipos: (service[name] && service[name].tipos) || []
            };
          } else {
            return { name: '', tipos: [] };
          }
        });
      },
      (error) => {
        console.error('Error al cargar servicios', error);
      }
    );
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.target.value;
    const selectedService = this.services.find(service => service.name === selectedCategory);
    this.selectedServiceTypes = selectedService ? selectedService.tipos : [];
    this.paymentForm.patchValue({ serviceType: '' });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      // Aquí podrías hacer la llamada a tu backend para procesar el pago
      console.log('Pago realizado', this.paymentForm.value);
    }
  }
}