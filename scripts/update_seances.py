#!/usr/bin/env python
"""
Script de production pour la mise à jour des séances de cinéma.

Ce script est destiné à être exécuté en production pour :
1. Scraper les nouvelles séances
2. Mettre à jour le cache backend (seances_cache.json)
3. Enrichir les données avec TMDb (durée, date de sortie, note)
4. Copier les données vers le frontend (public/seances.json)

Usage:
    ./update_seances.py
    # ou
    python update_seances.py

Output:
    - Met à jour backend/data/seances_cache.json
    - Met à jour backend/data/tmdb_cache.json
    - Met à jour frontend/public/seances.json avec les données enrichies
"""

import os
import sys
from pathlib import Path
import shutil
import logging
from datetime import datetime

# Ajouter le répertoire parent au PYTHONPATH
sys.path.append(str(Path(__file__).parent.parent))

from scrapers.allocine import AllocineScraper
from get_tmdb_data import update_seances_with_tmdb_data

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    logger.info("Démarrage du scraping des séances...")
    
    # Définir les chemins
    cache_path = Path(__file__).parent.parent / 'data' / 'seances_cache.json'
    frontend_path = Path(__file__).parent.parent.parent / 'frontend' / 'public' / 'seances.json'
    
    # Créer les répertoires de destination s'ils n'existent pas
    os.makedirs(os.path.dirname(cache_path), exist_ok=True)
    os.makedirs(os.path.dirname(frontend_path), exist_ok=True)
    
    # 1. Scraping avec AllocineScraper
    scraper = AllocineScraper()
    scraper.save_to_json(cache_path)
    logger.info(f"Cache backend mis à jour : {cache_path}")
    
    # 2. Copie vers le frontend
    shutil.copy2(cache_path, frontend_path)
    logger.info(f"Cache frontend mis à jour : {frontend_path}")
    
    # 3. Enrichissement avec TMDb
    logger.info("Enrichissement des données avec TMDb...")
    update_seances_with_tmdb_data()
    logger.info("Données TMDb ajoutées avec succès")

if __name__ == "__main__":
    main() 