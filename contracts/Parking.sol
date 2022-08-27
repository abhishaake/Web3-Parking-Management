// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Parking {

    uint TotalSlots;
    uint curId;
    uint carId;
    constructor () {
        carId=1;
        curId = 1;
        TotalSlots = 100;
    }

    struct details{
        uint id;
        string vehicleno;
        string name;
        string time;
        string isparked;
        bool parked;
    }

    mapping (uint => string) public parkedVehicles;
    mapping (string => details) public vehicles;

    function token (string memory _name, string memory _vehicleno , string memory _time) public {

        details memory _new = vehicles[_vehicleno];

        if(_new.parked==true){
            exit(_vehicleno);
        }

        else {
            entry(_name,_vehicleno,_time);
        }

    }

    function isparked(string memory name) public view returns( bool){
        details memory _new = vehicles[name];

        if(_new.parked==true) return true;
        else return false;
    }

    function entry (string memory _name, string memory _vehicleno , string memory _time) private {
        details memory _new = vehicles[_vehicleno];

        parkedVehicles[carId] = _vehicleno;

            _new.id = carId;
            _new.name = _name;
            _new.vehicleno = _vehicleno;
            _new.time = _time;
            _new.isparked = "IN";
            _new.parked = true;
            vehicles[_vehicleno] = _new;
            curId++;
            carId++;
    }

    function exit (string memory _vehicleno) private {
        details memory _new = vehicles[_vehicleno];


            _new.isparked = "OUT";
            _new.parked = false;
            curId--;
            vehicles[_vehicleno] = _new;
    }

    function getnum () public view returns (uint){
        return carId;
    }

    function getinfo (uint id) public view returns (details memory){
        string memory _name = parkedVehicles[id];

        details memory cur = vehicles[_name];

        return cur;
    }
   
}