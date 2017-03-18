var Build = (function() {
    var FALLBACK_ICON = 'coui://ui/main/game/live_game/img/build_bar/img_missing_unit.png';
    var pathWithoutExtensionMatch = /(.*)\.json[^\/]*$/;

    var iconForSpecId = function(id)
    {
        var match = null;
        if (id)
            match = pathWithoutExtensionMatch.exec(id);

        if (_.size(match) < 2)
            return FALLBACK_ICON;

        return 'coui:/' + match[1] + '_icon_buildbar.png';
    };

    var iconForUnit = function (unit)
    {
        if (!unit)
            return FALLBACK_ICON;
        return iconForSpecId(unit.id);
    };

    var HotkeyModel = function() {
        var self = this;

        self.SpecIdToGridMap = ko.observable(
            {
                "/pa/units/vanilla/land/control_module/control_module.json": ["utility", 7],
                "/pa/units/vanilla/land/radar_adv/radar_adv.json": ["utility", 8],
		"/pa/units/vanilla/sea/sonar_adv/sonar_adv.json": ["utility", 9],
                "/pa/units/vanilla/land/energy_plant_adv/energy_plant_adv.json": ["utility", 10],
                "/pa/units/vanilla/land/metal_extractor_adv/metal_extractor_adv.json": ["utility", 11],
                "/pa/units/vanilla/orbital/delta_v_engine/delta_v_engine.json": ["utility", 12],
                "/pa/units/vanilla/land/energy_storage/energy_storage.json": ["utility", 16],
                "/pa/units/vanilla/land/metal_storage/metal_storage.json": ["utility", 17],
                "/pa/units/vanilla/land/teleporter/teleporter.json": ["utility", 19],
                "/pa/units/vanilla/land/radar/radar.json": ["utility", 20],
                "/pa/units/vanilla/sea/sonar/sonar.json": ["utility", 21],
                "/pa/units/vanilla/land/energy_plant/energy_plant.json": ["utility", 22],
                "/pa/units/vanilla/land/metal_extractor/metal_extractor.json": ["utility", 23],


		"/pa/units/vanilla/air/titan_air/titan_air.json": ["factory", 9],
                "/pa/units/vanilla/land/titan_bot/titan_bot.json": ["factory", 10],
                "/pa/units/vanilla/land/titan_vehicle/titan_vehicle.json": ["factory", 11],
                "/pa/units/vanilla/land/unit_cannon/unit_cannon.json": ["factory", 13],
                "/pa/units/vanilla/sea/naval_factory_adv/naval_factory_adv.json": ["factory", 14],
                "/pa/units/vanilla/air/air_factory_adv/air_factory_adv.json": ["factory", 15],
                "/pa/units/vanilla/land/bot_factory_adv/bot_factory_adv.json": ["factory", 16],
                "/pa/units/vanilla/land/vehicle_factory_adv/vehicle_factory_adv.json": ["factory", 17],
                "/pa/units/vanilla/orbital/orbital_launcher/orbital_launcher.json": ["factory", 19],
                "/pa/units/vanilla/sea/naval_factory/naval_factory.json": ["factory", 20],
                "/pa/units/vanilla/air/air_factory/air_factory.json": ["factory", 21],
                "/pa/units/vanilla/land/bot_factory/bot_factory.json": ["factory", 22],
                "/pa/units/vanilla/land/vehicle_factory/vehicle_factory.json": ["factory", 23],

                "/pa/units/vanilla/land/laser_defense_adv/laser_defense_adv.json": ["combat", 7],
		"/pa/units/vanilla/land/laser_defense_sniper/laser_defense_sniper.json": ["combat", 6],
                "/pa/units/vanilla/land/artillery_long/artillery_long.json": ["combat", 9],
                "/pa/units/vanilla/land/air_defense_adv/air_defense_adv.json": ["combat", 8],
                "/pa/units/vanilla/land/tactical_missile_launcher/tactical_missile_launcher.json": ["combat", 11],
                "/pa/units/vanilla/land/nuke_launcher/nuke_launcher.json": ["combat", 13],
                "/pa/units/vanilla/land/laser_defense/laser_defense.json": ["combat", 12],
                "/pa/units/vanilla/land/air_defense/air_defense.json": ["combat", 14],
                "/pa/units/vanilla/land/artillery_unit_launcher/artillery_unit_launcher.json": ["combat", 15],
                "/pa/units/vanilla/sea/torpedo_launcher_adv/torpedo_launcher_adv.json": ["combat", 10],
                "/pa/units/vanilla/land/anti_nuke_launcher/anti_nuke_launcher.json": ["combat", 17],
                "/pa/units/vanilla/land/laser_defense_single/laser_defense_single.json": ["combat", 18],
                "/pa/units/vanilla/land/land_barrier/land_barrier.json": ["combat", 19],
		"/pa/units/vanilla/land/rocket_defense/rocket_defense.json": ["combat", 20],
                "/pa/units/vanilla/land/artillery_short/artillery_short.json": ["combat", 21],
                "/pa/units/vanilla/sea/torpedo_launcher/torpedo_launcher.json": ["combat", 22],
                "/pa/units/vanilla/orbital/ion_defense/ion_defense.json": ["combat", 23],


                "/pa/units/vanilla/land/tank_nuke/tank_nuke.json": ["vehicleadv", 12],
                "/pa/units/vanilla/sea/hover_ship/hover_ship.json": ["vehicleadv",13],
                "/pa/units/vanilla/land/tank_orbital/tank_orbital.json": ["vehicleadv", 23],
                "/pa/units/vanilla/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json": ["vehicleadv", 18],
                "/pa/units/vanilla/land/tank_laser_adv/tank_laser_adv.json": ["vehicleadv", 19],
                "/pa/units/vanilla/land/tank_armor/tank_armor.json": ["vehicleadv", 20],
                "/pa/units/vanilla/land/tank_heavy_mortar/tank_heavy_mortar.json": ["vehicleadv", 21],
                "/pa/units/vanilla/land/tank_flak/tank_flak.json": ["vehicleadv", 22],
                
                "/pa/units/vanilla/land/fabrication_vehicle/fabrication_vehicle.json": ["vehicle", 18],
                "/pa/units/vanilla/land/tank_light_laser/tank_light_laser.json": ["vehicle", 12],
                "/pa/units/vanilla/land/tank_heavy_armor/tank_heavy_armor.json": ["vehicle", 21],
                "/pa/units/vanilla/land/land_scout/land_scout.json": ["vehicle", 13],
				"/pa/units/vanilla/land/tank_attack/tank_attack.json": ["vehicle", 19],
                "/pa/units/vanilla/land/aa_missile_vehicle/aa_missile_vehicle.json": ["vehicle", 20],
				"/pa/units/vanilla/land/tank_heavy_artillery/tank_heavy_artillery.json": ["vehicle", 22],
                "/pa/units/vanilla/land/tank_hover/tank_hover.json": ["vehicle", 23],


                "/pa/units/vanilla/land/bot_support_commander/bot_support_commander.json": ["botadv", 12],
		"/pa/units/vanilla/land/bot_ubercannon/bot_ubercannon.json": ["botadv", 14],
		"/pa/units/vanilla/land/bot_skirmish/bot_skirmish.json": ["botadv", 13],
                "/pa/units/vanilla/land/fabrication_bot_adv/fabrication_bot_adv.json": ["botadv", 18],
                "/pa/units/vanilla/land/assault_bot_adv/assault_bot_adv.json": ["botadv", 19],
		"/pa/units/vanilla/land/bot_aa_adv/bot_aa_adv.json": ["botadv", 20],
                "/pa/units/vanilla/land/bot_sniper/bot_sniper.json": ["botadv", 21],
                "/pa/units/vanilla/land/fabrication_bot_combat/fabrication_bot_combat.json": ["botadv", 22],
                "/pa/units/vanilla/land/bot_tactical_missile/bot_tactical_missile.json": ["botadv", 23],

                "/pa/units/vanilla/land/fabrication_bot/fabrication_bot.json": ["bot", 18],
                "/pa/units/vanilla/land/assault_bot/assault_bot.json": ["bot", 19],
		"/pa/units/vanilla/land/bot_arty/bot_arty.json": ["bot", 13],
		"/pa/units/vanilla/land/bot_mortar/bot_mortar.json": ["bot", 20],
                "/pa/units/vanilla/land/bot_grenadier/bot_grenadier.json": ["bot", 21],
                "/pa/units/vanilla/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json": ["bot", 22],
                "/pa/units/vanilla/land/bot_bomb/bot_bomb.json": ["bot", 23],
                "/pa/units/vanilla/land/bot_tesla/bot_tesla.json": ["bot", 12],


                "/pa/units/vanilla/air/support_platform/support_platform.json": ["airadv", 23],
                "/pa/units/vanilla/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json": ["airadv", 18],
                "/pa/units/vanilla/air/fighter_adv/fighter_adv.json": ["airadv", 19],
                "/pa/units/vanilla/air/gunship/gunship.json": ["airadv", 20],
                "/pa/units/vanilla/air/bomber_adv/bomber_adv.json": ["airadv", 21],
                "/pa/units/vanilla/air/bomber_heavy/bomber_heavy.json": ["airadv", 22],
 
                "/pa/units/vanilla/air/fabrication_aircraft/fabrication_aircraft.json": ["air", 18],
                "/pa/units/vanilla/air/fighter/fighter.json": ["air", 19],
                "/pa/units/vanilla/air/bomber/bomber.json": ["air", 20],
                "/pa/units/vanilla/air/air_scout/air_scout.json": ["air", 23],
                "/pa/units/vanilla/air/transport/transport.json": ["air", 22],
                "/pa/units/vanilla/air/solar_drone/solar_drone.json": ["air", 21],


				"/pa/units/vanilla/sea/fabrication_sub/fabrication_sub.json": ["seaadv", 18],
                "/pa/units/vanilla/sea/drone_carrier/carrier/carrier.json": ["seaadv",23],
                "/pa/units/vanilla/sea/battleship/battleship.json": ["seaadv", 19],
                "/pa/units/vanilla/sea/missile_ship/missile_ship.json": ["seaadv", 20],
                "/pa/units/vanilla/sea/nuclear_sub/nuclear_sub.json": ["seaadv", 21],
                "/pa/units/vanilla/sea/frigate/frigate.json": ["seaadv", 22],
		 
                "/pa/units/vanilla/sea/fabrication_ship_adv/fabrication_ship_adv.json": ["sea",18],
                "/pa/units/vanilla/sea/destroyer/destroyer.json": ["sea", 20],
                "/pa/units/vanilla/sea/attack_sub/attack_sub.json": ["sea", 21],
                "/pa/units/vanilla/sea/sea_scout/sea_scout.json": ["sea", 19],
                "/pa/units/vanilla/sea/fabrication_barge/fabrication_barge.json": ["sea",22],


                "/pa/units/vanilla/orbital/titan_orbital/titan_orbital.json": ["orbital_structure", 6],
                "/pa/units/vanilla/orbital/defense_satellite/defense_satellite.json": ["orbital_structure", 12],
                "/pa/units/vanilla/orbital/mining_platform/mining_platform.json": ["orbital_structure", 13],
                "/pa/units/vanilla/orbital/solar_array/solar_array.json": ["orbital_structure", 14],
                "/pa/units/vanilla/orbital/orbital_factory/orbital_factory.json": ["orbital_structure", 15],
                
                "/pa/units/vanilla/orbital/orbital_battleship/orbital_battleship.json": ["orbital", 12],
                "/pa/units/vanilla/orbital/orbital_laser/orbital_laser.json": ["orbital", 13],
                "/pa/units/vanilla/orbital/orbital_railgun/orbital_railgun.json": ["orbital", 14],
                "/pa/units/vanilla/orbital/radar_satellite_adv/radar_satellite_adv.json": ["orbital", 15],
                "/pa/units/vanilla/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json": ["orbital", 18],
                "/pa/units/vanilla/orbital/orbital_fighter/orbital_fighter.json": ["orbital", 19],
                "/pa/units/vanilla/orbital/radar_satellite/radar_satellite.json": ["orbital", 20],
                "/pa/units/vanilla/orbital/orbital_lander/orbital_lander.json": ["orbital", 21],
                "/pa/units/vanilla/orbital/orbital_probe/orbital_probe.json": ["orbital", 22],

				
                "/pa/units/vanilla/land/land_mine/land_mine.json": ["ammo", 14],
                "/pa/units/vanilla/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json": ["ammo", 15],
                "/pa/units/vanilla/land/nuke_launcher/nuke_launcher_ammo.json": ["ammo", 16],


		"/pa/units/legion/air/l_titan_air/l_titan_air.json": [ "L_factory", 8 ],
		"/pa/units/legion/land/l_titan_bot/l_titan_bot.json": [ "L_factory", 9 ],
		"/pa/units/legion/land/l_titan_vehicle/l_titan_vehicle.json": [ "L_factory", 10 ],
		"/pa/units/legion/orbital/l_titan_orbital/l_titan_orbital.json": [ "L_orbital_structure", 6 ],
		"/pa/units/legion/air/l_flying_teleporter/l_flying_teleporter.json": [ "L_factory", 6 ],
		"/pa/units/legion/land/l_unit_cannon/l_unit_cannon.json": [ "L_factory", 12 ],
		"/pa/units/legion/sea/l_naval_factory_adv/l_naval_factory_adv.json": [ "L_factory", 13 ],
		"/pa/units/legion/air/l_air_factory_adv/l_air_factory_adv.json": [ "L_factory", 14 ],
		"/pa/units/legion/land/l_bot_factory_adv/l_bot_factory_adv.json": [ "L_factory", 15 ],
		"/pa/units/legion/land/l_vehicle_factory_adv/l_vehicle_factory_adv.json": [ "L_factory", 16 ],
		"/pa/units/legion/orbital/l_orbital_launcher/l_orbital_launcher.json": [ "L_factory", 18 ],
		"/pa/units/legion/sea/l_naval_factory/l_naval_factory.json": [ "L_factory", 19 ],
		"/pa/units/legion/air/l_air_factory/l_air_factory.json": [ "L_factory", 20 ],
		"/pa/units/legion/land/l_bot_factory/l_bot_factory.json": [ "L_factory", 21 ],
		"/pa/units/legion/land/l_vehicle_factory/l_vehicle_factory.json": [ "L_factory", 22 ],

		
		"/pa/units/legion/land/l_apocalypse_apparatus/l_apocalypse_apparatus.json": [ "L_combat", 6 ],
		"/pa/units/legion/land/l_flame_turret/l_flame_turret.json": [ "L_combat", 7 ],
		"/pa/units/legion/land/l_artillery_long/l_artillery_long.json": [ "L_combat", 9 ],
		"/pa/units/legion/land/l_rocket_barrage/l_rocket_barrage.json": [ "L_combat", 11 ],
		"/pa/units/legion/land/l_nuke_launcher/l_nuke_launcher.json": [ "L_combat", 13 ],
		"/pa/units/legion/land/l_t1_turret_adv/l_t1_turret_adv.json": [ "L_combat", 12 ],
		"/pa/units/legion/land/l_air_defense_adv/l_air_defense_adv.json": [ "L_combat", 8 ],
		"/pa/units/legion/land/l_air_defense_medium/l_air_defense_medium.json": [ "L_combat", 14 ],
		"/pa/units/legion/land/l_swarm_hive/l_swarm_hive.json": [ "L_combat", 15 ],
		"/pa/units/legion/sea/l_torpedo_launcher_adv/l_torpedo_launcher_adv.json": [ "L_combat", 10 ],
		"/pa/units/legion/land/l_anti_nuke_launcher/l_anti_nuke_launcher.json": [ "L_combat", 17 ],
		"/pa/units/legion/land/l_t1_turret_basic/l_t1_turret_basic.json": [ "L_combat", 18 ],
		"/pa/units/legion/land/l_land_barrier/l_land_barrier.json": [ "L_combat", 19 ],
		"/pa/units/legion/land/l_air_defense/l_air_defense.json": [ "L_combat", 20 ],
		"/pa/units/legion/land/l_artillery_short/l_artillery_short.json": [ "L_combat", 21 ],
		"/pa/units/legion/sea/l_torpedo_launcher/l_torpedo_launcher.json": [ "L_combat", 22 ],
		"/pa/units/legion/orbital/l_ion_defense/l_ion_defense.json": [ "L_combat", 23 ],

		
		"/pa/units/legion/land/l_control_module/l_control_module.json": [ "L_utility", 7 ],
		"/pa/units/legion/land/l_energy_plant_adv/l_energy_plant_adv.json": [ "L_utility", 10 ],
		"/pa/units/legion/land/l_mex_adv/l_mex_adv.json": [ "L_utility", 11 ],
		"/pa/units/legion/sea/l_sonar_adv/l_sonar_adv.json": [ "L_utility", 9 ],
		"/pa/units/legion/orbital/l_delta_v_engine/l_delta_v_engine.json": [ "L_utility", 12 ],
		"/pa/units/legion/land/l_radar_adv/l_radar_adv.json": [ "L_utility", 8 ],
		"/pa/units/legion/land/l_energy_plant/l_energy_plant.json": [ "L_utility", 22 ],
		"/pa/units/legion/land/l_mex/l_mex.json": [ "L_utility", 23 ],
		"/pa/units/legion/land/l_teleporter/l_teleporter.json": [ "L_utility", 19 ],
		"/pa/units/legion/land/l_radar/l_radar.json": [ "L_utility", 20 ],
		"/pa/units/legion/sea/l_sonar/l_sonar.json": [ "L_utility", 21],
		"/pa/units/legion/land/l_storage/l_storage.json": [ "L_utility", 16 ],

		
		"/pa/units/legion/sea/l_hover_ship/l_hover_ship.json": [ "L_vehicleadv", 12 ],
		"/pa/units/legion/land/l_tank_goliath/l_tank_goliath.json": [ "L_vehicleadv", 13 ],
		"/pa/units/legion/land/l_fabrication_vehicle_adv/l_fabrication_vehicle_adv.json": [ "L_vehicleadv", 18 ],
		"/pa/units/legion/land/l_tank_laser_adv/l_tank_laser_adv.json": [ "L_vehicleadv", 19 ],
		"/pa/units/legion/land/l_tank_heavy_armor/l_tank_heavy_armor.json": [ "L_vehicleadv", 20 ],
		"/pa/units/legion/land/l_tank_swarm/l_tank_swarm.json": [ "L_vehicleadv", 21 ],
		"/pa/units/legion/land/l_hover_tank_adv/l_hover_tank_adv.json": [ "L_vehicleadv", 22 ],
		"/pa/units/legion/land/l_sniper_tank/l_sniper_tank.json": [ "L_vehicleadv", 23 ],
				
		"/pa/units/legion/land/l_tank_medium/l_tank_medium.json": [ "L_vehicle", 12 ],
		"/pa/units/legion/land/l_fabrication_vehicle/l_fabrication_vehicle.json": [ "L_vehicle", 18 ],
		"/pa/units/legion/land/l_tank_shank/l_tank_shank.json": [ "L_vehicle", 19 ],
		"/pa/units/legion/land/l_shotgun_tank/l_shotgun_tank.json": [ "L_vehicle", 20 ],
		"/pa/units/legion/land/l_mortar_tank/l_mortar_tank.json": [ "L_vehicle", 21 ],
		"/pa/units/legion/land/l_hover_laser/l_hover_laser.json": [ "L_vehicle", 22 ],
		"/pa/units/legion/land/l_fabrication_vehicle_combat/l_fabrication_vehicle_combat.json": [ "L_vehicle", 23 ],

		
		"/pa/units/legion/land/l_bot_support_commander/l_bot_support_commander.json": [ "L_botadv", 12 ],
		"/pa/units/legion/land/l_bot_morty_adv/l_bot_morty_adv.json": [ "L_botadv", 13 ],
		"/pa/units/legion/land/l_flame_bot/l_flame_bot.json": [ "L_botadv", 14 ],
		"/pa/units/legion/land/l_fabrication_bot_adv/l_fabrication_bot_adv.json": [ "L_botadv", 18 ],
		"/pa/units/legion/land/l_riot_bot/l_riot_bot.json": [ "L_botadv", 19 ],
		"/pa/units/legion/land/l_bot_heavy/l_bot_heavy.json": [ "L_botadv", 20 ],
		"/pa/units/legion/land/l_bot_aa_adv/l_bot_aa_adv.json": [ "L_botadv", 21 ],
		"/pa/units/legion/land/l_bot_nanoswarm/l_bot_nanoswarm.json": [ "L_botadv", 22 ],
		"/pa/units/legion/land/l_necromancer/l_necromancer.json": [ "L_botadv", 23 ],
		
		"/pa/units/legion/land/l_bot_artillery/l_bot_artillery.json": [ "L_bot", 12 ],
		"/pa/units/legion/land/l_bot_orbital/l_bot_orbital.json": ["L_bot", 13],
		"/pa/units/legion/land/l_fabrication_bot/l_fabrication_bot.json": [ "L_bot", 18 ],
		"/pa/units/legion/land/l_assault_bot/l_assault_bot.json": [ "L_bot", 19 ],
		"/pa/units/legion/land/l_sniper_bot/l_sniper_bot.json": [ "L_bot", 20 ],
		"/pa/units/legion/land/l_bot_aa/l_bot_aa.json": [ "L_bot", 21 ],
		"/pa/units/legion/land/l_bot_bomb/l_bot_bomb.json": [ "L_bot", 22 ],
		"/pa/units/legion/land/l_scout_bot/l_scout_bot.json": [ "L_bot", 23 ],

		
		"/pa/units/legion/air/l_fabrication_aircraft_adv/l_fabrication_aircraft_adv.json": [ "L_airadv", 18 ],
		"/pa/units/legion/air/l_fighter_adv/l_fighter_adv.json": [ "L_airadv", 19 ],
		"/pa/units/legion/air/l_gunship/l_gunship.json": [ "L_airadv", 20 ],
		"/pa/units/legion/air/l_air_carrier/l_air_carrier.json": [ "L_airadv", 21 ],
		"/pa/units/legion/air/l_air_scout_adv/l_air_scout_adv.json": [ "L_airadv", 22 ],
		"/pa/units/legion/air/l_firestarter/l_firestarter.json": [ "L_airadv", 23 ],
		
		"/pa/units/legion/air/l_fabrication_aircraft/l_fabrication_aircraft.json": [ "L_air", 18 ],
		"/pa/units/legion/air/l_fighter/l_fighter.json": [ "L_air", 19 ],
		"/pa/units/legion/air/l_bomber/l_bomber.json": [ "L_air", 20 ],
		"/pa/units/legion/air/l_raider/l_raider.json": [ "L_air", 21 ],
		"/pa/units/legion/air/l_transport/l_transport.json": [ "L_air", 22 ],
		"/pa/units/legion/air/l_air_bomb/l_air_bomb.json": [ "L_air", 23 ],

		
		"/pa/units/legion/sea/l_hover_ship/l_hover_ship.json": [ "L_seaadv", 19 ],
		"/pa/units/legion/sea/l_fabrication_ship_adv/l_fabrication_ship_adv.json": [ "L_seaadv", 18 ],
		"/pa/units/legion/sea/l_sea_tank/l_sea_tank.json": [ "L_seaadv", 20 ],
		"/pa/units/legion/sea/l_battlecruiser/l_battlecruiser.json": [ "L_seaadv", 21 ],
		"/pa/units/legion/sea/l_missile_ship/l_missile_ship.json": [ "L_seaadv", 22 ],
		"/pa/units/legion/sea/l_fabrication_sub_combat_adv/l_fabrication_sub_combat_adv.json": [ "L_seaadv", 23 ],
		
		"/pa/units/legion/sea/l_fabrication_ship/l_fabrication_ship.json": [ "L_sea", 18 ],
		"/pa/units/legion/sea/l_sea_scout/l_sea_scout.json": [ "L_sea", 19 ],
		"/pa/units/legion/sea/l_destroyer/l_destroyer.json": [ "L_sea", 20 ],
		"/pa/units/legion/sea/l_attack_sub/l_attack_sub.json": [ "L_sea", 21 ],
		"/pa/units/legion/sea/l_frigate/l_frigate.json": [ "L_sea", 22 ],
		"/pa/units/legion/sea/l_boat_torpedo/l_boat_torpedo.json": [ "L_sea", 23 ],

		
		"/pa/units/legion/orbital/l_orbital_battleship/l_orbital_battleship.json": [ "L_orbital", 12 ],
		"/pa/units/legion/orbital/l_orbital_railgun/l_orbital_railgun.json": [ "L_orbital", 14 ],
		"/pa/units/legion/orbital/l_orbital_laser/l_orbital_laser.json": [ "L_orbital", 13 ],
		"/pa/units/legion/orbital/l_radar_satellite_adv/l_radar_satellite_adv.json": [ "L_orbital", 15 ],
		"/pa/units/legion/orbital/l_orbital_fabrication_bot/l_orbital_fabrication_bot.json": [ "L_orbital", 18 ],
		"/pa/units/legion/orbital/l_orbital_fighter/l_orbital_fighter.json": [ "L_orbital", 19 ],
		"/pa/units/legion/orbital/l_orbital_probe/l_orbital_probe.json": [ "L_orbital", 22 ],
		"/pa/units/legion/orbital/l_orbital_lander/l_orbital_lander.json": [ "L_orbital", 21 ],
		"/pa/units/legion/orbital/l_radar_satellite/l_radar_satellite.json": [ "L_orbital", 20 ],
		
		"/pa/units/legion/orbital/l_orbital_dropper/l_orbital_dropper.json": [ "L_orbital_structure", 18 ],
		"/pa/units/legion/orbital/l_mining_platform/l_mining_platform.json": [ "L_orbital_structure", 19 ],
		"/pa/units/legion/orbital/l_orbital_factory/l_orbital_factory.json": [ "L_orbital_structure", 20 ],
		"/pa/units/legion/orbital/l_defense_satellite/l_defense_satellite.json": [ "L_orbital_structure", 21 ],

		
		"/pa/units/legion/land/l_land_mine/l_land_mine.json": [ "L_ammo", 18 ],
		"/pa/units/legion/sea/l_sea_mine/l_sea_mine.json": [ "L_ammo", 19 ],
		"/pa/units/legion/land/l_anti_nuke_launcher/l_anti_nuke_launcher_ammo.json": [ "L_ammo", 21 ],
		"/pa/units/legion/land/l_nuke_launcher/l_nuke_launcher_ammo.json": [ "L_ammo", 22 ]
            }
        );
    };

    return {
        iconForSpecId: iconForSpecId,
        iconForUnit: iconForUnit,
        HotkeyModel: HotkeyModel,
    };
})();
