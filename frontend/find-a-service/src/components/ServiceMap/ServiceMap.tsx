import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Service } from '../../types';
import styles from './ServiceMap.module.css';

interface ServiceMapProps {
  services: Service[];
}

export function ServiceMap({ services }: ServiceMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [40.73, -73.99],
      zoom: 12,
      zoomControl: true,
      fadeAnimation: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const layer = L.layerGroup().addTo(map);
    markerLayerRef.current = layer;
    mapRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  // Update markers when services change
  useEffect(() => {
    if (!mapReady || !mapRef.current || !markerLayerRef.current) return;

    const layer = markerLayerRef.current;
    const map = mapRef.current;

    layer.clearLayers();

    services.forEach((svc) => {
      const popupContent = `
        <strong>${svc.name}</strong><br />
        <span class="category-tag">${svc.category}</span><br />
        <span class="address">${svc.address}</span>
        ${svc.description ? `<br /><span style="font-size:0.8rem;color:#64748b;">${svc.description}</span>` : ''}
      `;

      const marker = L.marker([svc.lat, svc.lng], {
        title: svc.name,
      }).bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup',
      });

      marker.addTo(layer);
    });

    if (services.length > 0) {
      const bounds = L.latLngBounds(services.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else {
      map.setView([40.73, -73.99], 12);
    }
  }, [services, mapReady]);

  return (
    <div className={styles.mapContainer}>
      <div ref={containerRef} className={styles.map} />
      {!mapReady && (
        <div className={styles.placeholder}>
          <div className={styles.spinner} />
          <span>Loading map…</span>
        </div>
      )}
    </div>
  );
}