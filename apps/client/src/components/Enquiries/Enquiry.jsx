const Enquiry = ({ enquiry, key }) => {
    return (
        <tr>
            <td className="px-5 py-2">{enquiry?.name}</td>
            <td className="px-5 py-2">{enquiry?.contact_number}<br />{enquiry?.email}</td>
            <td className="px-5 py-2">{enquiry?.event_date}</td>
            <td className="px-5 py-2">{enquiry?.event_type}</td>
            <td className="w-72 px-5 py-2">{enquiry?.event_description}</td>
        </tr>
    )
}

export default Enquiry